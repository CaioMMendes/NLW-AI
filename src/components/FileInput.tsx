"use client";
import { File, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { ChangeEvent, useMemo, useState } from "react";

const FileInput = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    if (files?.length === 0 || !files) {
      return;
    }

    const selectedFile = files[0];
    setVideoFile(selectedFile);
  };

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null;
    }
    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  return (
    <form className="flex flex-col gap-4">
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
            <File className="w-4 h-4" />
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
