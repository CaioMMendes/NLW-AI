import { Button } from "./ui/button";
import { GithubIcon } from "lucide-react";
const Header = () => {
  return (
    <div className="px-6 flex py-3 items-center justify-between border-b">
      <h1 className="text-xl font-semibold">AI.vídeo</h1>

      <div>
        <Button
          className="flex gap-1 hover:bg-primary hover:outline-none hover:border-primary dark:hover:text-primary-foreground"
          variant="outline"
        >
          <GithubIcon size={24} />
          Github
        </Button>
      </div>
    </div>
  );
};

export default Header;
