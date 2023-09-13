import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import FileInput from "./FileInput";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";

const SideBar = () => {
  return (
    <div className="w-full flex-flex-col  md:w-80 md:order-2 gap-y-4">
      <form className="flex flex-col gap-4">
        <FileInput />
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
          Carregar Arquivo
          <Upload className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </div>
  );
};

export default SideBar;
