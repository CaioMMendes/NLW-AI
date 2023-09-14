import { File } from "lucide-react";

const FileInput = () => {
  return (
    <>
      <label
        htmlFor="video"
        className=" w-full border flex rounded-lg aspect-video items-center justify-center
          cursor-pointer border-dashed text-sm flex-col gap-2 text-muted-foreground
           border-inputBorderLight dark:border-inputBorderDark hover:bg-primary/5"
      >
        <File className="w-4 h-4" />
        Selecionar Arquivo
      </label>
      <input
        type="file"
        name="video"
        id="video"
        accept="video/mp4"
        //serve para leitores de tela conseguirem pegar
        className="sr-only"
      />
    </>
  );
};

export default FileInput;
