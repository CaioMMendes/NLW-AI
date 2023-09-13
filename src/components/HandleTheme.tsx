"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function HandleTheme() {
  const { setTheme, theme } = useTheme();
  function handleTheme() {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  }
  return (
    <Button
      variant="outline"
      size="icon"
      className="flex  w-fit gap-2 px-2 hover:bg-primary hover:outline-none hover:border-primary dark:hover:text-primary-foreground"
      onClick={handleTheme}
    >
      {/* <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
      <SunIcon className="h-[1.2rem]  w-fit rotate-0 scale-100  dark:-rotate-90 dark:hidden" />
      <MoonIcon className=" h-[1.2rem] w-fit hidden  rotate-90 scale-0  dark:flex dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
