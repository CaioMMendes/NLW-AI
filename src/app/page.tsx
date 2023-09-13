import Header from "@/components/Header";
import { ThemeDropdown } from "@/components/themeDropDown";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 p-5 gap-4">
        <Button>teste</Button>
        <ThemeDropdown />
      </main>
    </div>
  );
}
