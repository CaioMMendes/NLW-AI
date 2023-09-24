"use client";
import { Upload, File as FileLucide } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useMemo,
  useRef,
  useState,
} from "react";
import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useGlobalContext } from "@/context/TemplateContext";

type Status = "waiting" | "converting" | "uploading" | "generating" | "success";
const statusMessage = {
  converting: "Convertendo...",
  generating: "Transcrevendo...",
  uploading: "Carregando...",
  success: "Sucesso!",
};
interface SetVideoProps {
  setVideoId: (id: string) => void;
}

const FileInput = ({ setVideoId }: SetVideoProps) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("waiting");
  const { setShowTranscription, setTranscriptionContext } = useGlobalContext();
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
    setStatus("converting");

    //converter vídeo em áudio
    const audioFile = await convertVideoToAudio(videoFile);

    const data = new FormData();
    data.append("file", audioFile);
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    setStatus("uploading");
    const response = await fetch(`${baseURL}/videos`, {
      method: "POST",
      body: data,
    });
    const jsonResponse = await response.json();
    const videoId = jsonResponse.id;

    setStatus("generating");
    const transcription = await fetch(
      `${baseURL}/videos/${videoId}/transcription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Defina o cabeçalho Content-Type
        },
        body: JSON.stringify({
          prompt,
          AI: "chatGpt",
        }),
      }
    );
    const jsonTranscription = await transcription.json();

    setTranscriptionContext(jsonTranscription.transcription);
    setStatus("success");
    setVideoId(videoId);
  };

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null;
    }
    setStatus("waiting");
    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  const handleRadio = (event: string) => {
    setShowTranscription(event);
  };

  return (
    <form onSubmit={handleUploadVideo} className="flex flex-col gap-4">
      <label
        htmlFor="video"
        className=" w-full h-full  border flex rounded-lg aspect-video items-center justify-center
          cursor-pointer border-dashed text-sm flex-col gap-2 text-muted-foreground
           border-inputBorderLight dark:border-inputBorderDark hover:bg-primary/5 relative"
      >
        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none absolute inset-0 w-full h-full rounded-lg"
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
          disabled={status !== "waiting"}
          id="transcription_prompt"
          className="min-h-[5rem]  leading-relaxed"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula"
        />
      </div>
      <div className="flex flex-col w-full gap-2 mb-2">
        <label>Exibir transcrição do vídeo:</label>
        <RadioGroup
          defaultValue="false"
          className="flex-row flex gap-10"
          onValueChange={handleRadio}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="option-one" />
            <Label htmlFor="option-one">Não</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="option-two" />
            <Label htmlFor="option-two">Sim</Label>
          </div>
        </RadioGroup>
      </div>
      <Button
        type="submit"
        disabled={status !== "waiting"}
        className="w-full data-[success=true]:dark:bg-emerald-400 data-[success=true]:bg-emerald-600"
        data-success={status === "success"}
      >
        {status === "waiting" ? (
          <>
            Enviar Arquivo
            <Upload className="w-4 h-4 ml-2" />
          </>
        ) : (
          statusMessage[status]
        )}
      </Button>
    </form>
  );
};

export default FileInput;
