"use client";
import { Upload, File as FileLucide } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const FileInput = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    if (files?.length === 0 || !files) {
      return;
    }

    const selectedFile = files[0];
    setVideoFile(selectedFile);
  };

  const convertVideoToAudio = async (video: File) => {
    console.log("Convert started");
    const ffmpeg = await getFFmpeg();
    await ffmpeg.writeFile("input.mp4", await fetchFile(video));
    //caso de erro descomentar
    // ffmpeg.on('log',log=>{
    //   console.log(log)
    // })
    ffmpeg.on("progress", (progress) => {
      console.log(`Convert progress ${Math.round(progress.progress * 100)}%`);
    });
    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-map",
      "0:a",
      "-b:a",
      "20k",
      "-acodec",
      "libmp3lame",
      "output.mp3",
    ]);
    const data = await ffmpeg.readFile("output.mp3");
    const audioFileBlob = new Blob([data], { type: "audio/mpeg" });
    const audioFile = new File([audioFileBlob], "audio.mp3", {
      type: "audio/mpeg",
    });
    console.log("Convert finished");
    return audioFile;
  };

  const handleUploadVideo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = promptInputRef.current?.value;
    if (!videoFile) {
      return alert("Selecione um vídeo");
    }

    //converter vídeo em áudio
    const audioFile = await convertVideoToAudio(videoFile);
    console.log(audioFile, prompt);
  };

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null;
    }
    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  return (
    <form onSubmit={handleUploadVideo} className="flex flex-col gap-4">
      <label
        htmlFor="video"
        className=" w-full border flex rounded-lg aspect-video items-center justify-center
          cursor-pointer border-dashed text-sm flex-col gap-2 text-muted-foreground
           border-inputBorderLight dark:border-inputBorderDark hover:bg-primary/5 relative"
      >
        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none absolute inset-0"
          />
        ) : (
          <>
            <FileLucide className="w-4 h-4" />
            Selecionar Arquivo
          </>
        )}
      </label>
      <input
        type="file"
        name="video"
        id="video"
        onChange={handleFileSelected}
        accept="video/mp4"
        //serve para leitores de tela conseguirem pegar
        className="sr-only"
      />
      <Separator />
      <div className="flex gap-y-2 flex-col">
        <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
        <Textarea
          ref={promptInputRef}
          id="transcription_prompt"
          className="min-h-[5rem]  leading-relaxed"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula"
        />
      </div>
      <Button type="submit" className="w-full">
        Enviar Arquivo
        <Upload className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
};

export default FileInput;
