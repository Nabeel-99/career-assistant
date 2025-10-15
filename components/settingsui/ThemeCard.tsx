"use client";

import React, { useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="grid grid-cols-2 gap-10">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Choose light or dark mode, or switch your mode automatically based
            on your system settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-10">
          <button
            type="button"
            className="flex flex-col cursor-pointer items-center gap-2"
          >
            <div className="size-10 rounded-full border bg-white"></div>
            <p className="text-sm text-subheadline">Light</p>
          </button>
          <button
            type="button"
            className="flex flex-col cursor-pointer items-center gap-2"
          >
            <div className="size-10 rounded-full border bg-black"></div>
            <p className="text-sm text-subheadline">Dark</p>
          </button>
          <button
            type="button"
            className="flex flex-col cursor-pointer items-center gap-2"
          >
            <div className="size-10 rounded-full border border-black bg-gradient-to-r from-white from-50% to-50% to-black"></div>
            <p className="text-sm text-subheadline">System</p>
          </button>
        </CardContent>
      </Card>
    );
  }

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
          type="button"
          onClick={() => setTheme("light")}
          className="flex flex-col cursor-pointer items-center gap-2"
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
          type="button"
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
          type="button"
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
