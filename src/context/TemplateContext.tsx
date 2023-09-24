"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface ContextTypes {
  videoIdContext: string | null;
  setVideoIdContext: Dispatch<SetStateAction<string | null>>;
  temperatureContext: number;
  setTemperatureContext: Dispatch<SetStateAction<number>>;
  showTranscription: string;
  setShowTranscription: Dispatch<SetStateAction<string>>;
  transcriptionContext: string;
  setTranscriptionContext: Dispatch<SetStateAction<string>>;
}
const GlobalContext = createContext<ContextTypes>({
  videoIdContext: null,
  setVideoIdContext: (): string | null => null,
  temperatureContext: 0.5,
  setTemperatureContext: (): number => 0.5,
  showTranscription: "false",
  setShowTranscription: (): string => "false",
  transcriptionContext: "",
  setTranscriptionContext: (): string => "",
});

export const GlobalContextProvider = ({ children }: any) => {
  const [videoIdContext, setVideoIdContext] = useState<string | null>(null);
  const [temperatureContext, setTemperatureContext] = useState(0.5);
  const [showTranscription, setShowTranscription] = useState("false");
  const [transcriptionContext, setTranscriptionContext] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        videoIdContext,
        setVideoIdContext,
        temperatureContext,
        setTemperatureContext,
        showTranscription,
        setShowTranscription,
        transcriptionContext,
        setTranscriptionContext,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
