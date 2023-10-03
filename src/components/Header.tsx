import { HandleTheme } from "./HandleTheme";
import { Button } from "./ui/button";
import { GithubIcon } from "lucide-react";
import { Separator } from "./ui/separator";
const Header = () => {
  return (
    <div className="px-6 flex py-3 items-center justify-between border-b w-full">
      <h1 className="text-xl font-semibold">AI.vídeo</h1>

      <div className="flex gap-4">
        <HandleTheme />
      </div>
    </div>
  );
};

export default Header;
