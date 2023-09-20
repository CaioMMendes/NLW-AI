"use client";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import TextAreas from "@/components/TextAreas";

export default function Home() {
  const handlePropmptSelected = (template: string) => {
    console.log(template);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 p-5 gap-4 flex-col md:flex-row">
        <TextAreas />
        <SideBar handlePromptSelected={handlePropmptSelected} />
      </main>
    </div>
  );
}
