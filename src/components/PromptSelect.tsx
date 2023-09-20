"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PromptSelectProps } from "./SideBar";

interface Prompt {
  id: string;
  title: string;
  template: string;
}

const PromptSelect = ({ handlePromptSelected }: PromptSelectProps) => {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);

  useEffect(() => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    fetch(`${baseURL}/prompts`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setPrompts(data));
  }, []);
  console.log(prompts);
  const handlePromptSelectedTemplate = (promptId: string) => {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId);
    if (!selectedPrompt) {
      return;
    }
    handlePromptSelected(selectedPrompt.template);
  };
  return (
    <Select onValueChange={handlePromptSelectedTemplate}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map((prompt) => {
          return (
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.title}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default PromptSelect;
