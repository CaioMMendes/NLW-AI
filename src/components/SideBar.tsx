"use client";
import { Wand2 } from "lucide-react";
import FileInput from "./FileInput";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";
import PromptSelect from "./PromptSelect";

export interface PromptSelectProps {
  handlePromptSelected: (template: string) => void;
}
const SideBar = ({ handlePromptSelected }: PromptSelectProps) => {
  return (
    <div className="w-full flex flex-col  md:w-80 md:order-2 gap-y-4">
      <FileInput />
      <Separator />
      <form className="flex gap-y-6 flex-col">
        <div className="flex flex-col gap-y-2">
          <Label>Prompt</Label>
          <PromptSelect handlePromptSelected={handlePromptSelected} />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Modelo</Label>
          <Select disabled defaultValue="gpt3.5">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
            </SelectContent>
          </Select>
          <span className="block text-xs text-muted-foreground italic">
            Você poderá customizar esta opção em breve.
          </span>
        </div>
        <Separator />
        <div className="flex flex-col gap-y-4">
          <Label>Temperatura</Label>
          <Slider min={0} max={1} step={0.05} defaultValue={[0.5]} />
          <span className="block text-xs text-muted-foreground italic leading-relaxed">
            Valores mais altos tender a deixar o resultado mais criativo, porém,
            com mais chances de erros.
          </span>
        </div>
        <Separator />
        <Button type="submit" className="w-full">
          Executar
          <Wand2 className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </div>
  );
};

export default SideBar;
