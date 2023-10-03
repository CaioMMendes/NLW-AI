"use client";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import TextAreas from "@/components/TextAreas";
import { useGlobalContext } from "@/context/TemplateContext";
import { useCompletion } from "ai/react";

export default function Home() {
  const { videoIdContext, temperatureContext } = useGlobalContext();
  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: `${process.env.NEXT_PUBLIC_BASE_URL}/ai/complete`,
    body: {
      videoId: videoIdContext,
      temperature: temperatureContext,
      AI: "chatGpt",
    },
    headers: {
      "Content-type": "application/json",
    },
  });
  return (
    <div className="min-h-screen flex flex-col max-w-[2000px]  justify-center items-center w-full m-auto">
      <Header />
      <main className="flex flex-1 p-5 gap-4 flex-col md:flex-row ">
        <TextAreas
          input={input}
          handleInputChange={handleInputChange}
          completion={completion}
        />
        <SideBar
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
