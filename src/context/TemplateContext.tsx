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
}
const GlobalContext = createContext<ContextTypes>({
  videoIdContext: null,
  setVideoIdContext: (): string | null => null,
  temperatureContext: 0.5,
  setTemperatureContext: (): number => 0.5,
});

export const GlobalContextProvider = ({ children }: any) => {
  const [videoIdContext, setVideoIdContext] = useState<string | null>(null);
  const [temperatureContext, setTemperatureContext] = useState(0.5);

  return (
    <GlobalContext.Provider
      value={{
        videoIdContext,
        setVideoIdContext,
        temperatureContext,
        setTemperatureContext,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
