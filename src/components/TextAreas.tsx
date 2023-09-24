"use client";
import { ChangeEvent } from "react";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useGlobalContext } from "@/context/TemplateContext";

interface TextAreaProps {
  input: string;
  handleInputChange: (input: ChangeEvent<HTMLTextAreaElement>) => void;
  completion: string;
}

const TextAreas = ({ input, handleInputChange, completion }: TextAreaProps) => {
  const { showTranscription, transcriptionContext } = useGlobalContext();
  return (
    <>
      <div
        className={`flex flex-col md:flex-1  order-2  md:h-auto ${
          transcriptionContext === "true" ? "h-[32rem]" : "h-[28rem]"
        }`}
      >
        <div
          className={`grid  ${
            showTranscription === "true" ? "grid-rows-3" : "grid-rows-2"
          }  gap-5 md:gap-4 flex-1`}
        >
          <div
            className={` flex-col  w-full  ${
              showTranscription === "false" ? "hidden" : "flex"
            }`}
          >
            <Textarea
              value={transcriptionContext}
              readOnly
              placeholder="Transcrição..."
              className="resize-none p-3 md:p-4 leading-relaxed flex-1"
            />
          </div>
          <div className="flex flex-col gap-2">
            {/* <Label className="text-lg">Entrada:</Label> */}
            <Textarea
              placeholder="Inclua o prompt para a IA..."
              className="resize-none p-3 md:p-4 leading-relaxed flex-1"
              value={input}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            {/* <Label className="text-lg">Saída:</Label> */}
            <Textarea
              placeholder="Resultado gerado pela IA"
              readOnly
              className="resize-none p-3 md:p-4 leading-relaxed flex-1"
              value={completion}
            />
          </div>
        </div>
        <p className="text-xs md:text-sm">
          Lembre-se: Você pode utilizar a variável transcription no seu prompt
          para adicionar o conteúdo da{" "}
          <code className="text-primary dark:text-white font-bold">
            {"{transcrição}"}
          </code>{" "}
          do vídeo selecionado.
        </p>
      </div>
    </>
  );
};

export default TextAreas;
