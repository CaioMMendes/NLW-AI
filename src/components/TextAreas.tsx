"use client";
import { useGlobalContext } from "@/context/TemplateContext";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, ChangeEventHandler } from "react";

interface TextAreaProps {
  input: string;
  handleInputChange: (input: ChangeEvent<HTMLTextAreaElement>) => void;
  completion: string;
}

const TextAreas = ({ input, handleInputChange, completion }: TextAreaProps) => {
  console.log("💥", input);
  return (
    <div className="flex flex-col flex-1  order-2">
      <div className="grid grid-rows-2 gap-4 flex-1">
        <Textarea
          placeholder="Inclua o prompt para a IA..."
          className="resize-none p-3 md:p-4 leading-relaxed"
          value={input}
          onChange={handleInputChange}
        />
        <Textarea
          placeholder="Resultado gerado pela IA"
          readOnly
          className="resize-none p-3 md:p-4 leading-relaxed"
          value={completion}
        />
      </div>
      <p className="text-sm">
        Lembre-se: Você pode utilizar a variável transcription no seu prompt
        para adicionar o conteúdo da{" "}
        <code className="text-primary dark:text-white font-bold">
          {"{transcrição}"}
        </code>{" "}
        do vídeo selecionado.
      </p>
    </div>
  );
};

export default TextAreas;
