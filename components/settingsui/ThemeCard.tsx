"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const ThemeCard = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Card className="grid grid-cols-2 gap-10">
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Choose light or dark mode, or switch your mode automatically based on
          your system settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-10">
        <button
          onClick={() => setTheme("light")}
          className="flex flex-col cursor-pointer  items-center gap-2"
        >
          <div
            className={cn(
              "size-10 rounded-full border bg-white",
              theme === "light" && "border-2 border-blue-400"
            )}
          ></div>
          <p
            className={cn(
              "text-sm text-subheadline",
              theme === "light" && "text-blue-400"
            )}
          >
            Light
          </p>
        </button>
        <button
          onClick={() => setTheme("dark")}
          className="flex flex-col cursor-pointer items-center gap-2"
        >
          <div
            className={cn(
              "size-10 rounded-full border bg-black",
              theme === "dark" && "border-2 border-blue-400"
            )}
          ></div>
          <p
            className={cn(
              "text-sm text-subheadline",
              theme === "dark" && "text-blue-400"
            )}
          >
            Dark
          </p>
        </button>
        <button
          onClick={() => setTheme("system")}
          className="flex flex-col cursor-pointer items-center gap-2"
        >
          <div
            className={cn(
              "size-10 rounded-full border border-black bg-gradient-to-r from-white from-50% to-50% to-black",
              theme === "system" && "border-2 border-blue-400"
            )}
          ></div>
          <p
            className={cn(
              "text-sm text-subheadline",
              theme === "system" && "text-blue-400"
            )}
          >
            System
          </p>
        </button>
      </CardContent>
    </Card>
  );
};

export default ThemeCard;
