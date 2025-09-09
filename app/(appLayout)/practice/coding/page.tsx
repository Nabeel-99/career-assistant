"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { User } from "@/lib/generated/prisma";
import { fetchUser } from "@/lib/action";
import { toast } from "sonner";
import { GiArtificialHive } from "react-icons/gi";
import { animate, stagger } from "motion";
import { generateCodingTask } from "@/lib/ai";
import { readStreamableValue } from "@ai-sdk/rsc";
import { extractJSONFromText } from "@/lib/utils";
import TaskGenerator from "@/components/practiceui/TaskGenerator";
import PromptGenerator from "@/components/practiceui/PromptGenerator";
import CodingEditor from "@/components/practiceui/CodingEditor";

const page = () => {
  const sidebar = useSidebar();
  const { systemTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [stackSelected, setStackSelected] = useState<string | null>(null);
  const [levelSelected, setLevelSelected] = useState<string | null>(null);
  const [isYes, setIsYes] = useState(false);
  const [isLevel, setIsLevel] = useState(false);
  const [levelTypingDone, setLevelTypingDone] = useState(false);
  const [generation, setGeneration] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [jsonData, setJsonData] = useState<any>(null);
  const beginPractice = () => {
    // Clear previous generation and reset state for fresh start
    setGeneration("");
    setJsonData(null);
    setIsGenerating(false);
    setStackSelected(null);
    setLevelSelected(null);
    setIsYes(false);
    setIsLevel(false);
    setLevelTypingDone(false);
    setTypingDone(false);
    setIsStarted(true);
  };
  const showLevel = () => setIsLevel(true);

  const generateTask = async (level: string) => {
    try {
      setLevelSelected(level);
      setIsGenerating(true);
      setGeneration("");
      setIsStarted(false);
      setJsonData(null);

      const { output } = await generateCodingTask(
        [`${stackSelected}`],
        `${levelSelected}`,
        [
          // "GoLang, structs, slices, filtering, error handling, beginner",
          // "Maps, String Manipulation, Counting, Functions",
        ]
      );

      console.log("🔍 Generated output:", output);

      let fullText = "";
      for await (const chunk of readStreamableValue(output)) {
        console.log("📝 Streaming chunk:", chunk);
        fullText += chunk;
        setGeneration((currentGeneration) => `${currentGeneration}${chunk}`);

        // Add a small delay to slow down the streaming
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      const res = extractJSONFromText(fullText);
      setJsonData(res?.clientJson);

      setIsGenerating(false);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    // sidebar.setOpen(false);
    animate("button", { opacity: 1 }, { delay: stagger(0.2) });
    const getUserDetails = async () => {
      try {
        setLoading(true);
        const res = await fetchUser();
        setUser(res);
      } catch (error) {
        toast.error("Error fetching user details");
      } finally {
        setLoading(false);
      }
    };
    getUserDetails();
  }, []);

  useEffect(() => {
    if (typingDone) {
      console.log("typing Done", typingDone);
      // Animate buttons with stagger effect
      animate(".stack", { opacity: 1, y: 0 }, { delay: stagger(0.1) });
    }
    if (levelTypingDone) {
      animate(".level", { opacity: 1, y: 0 }, { delay: stagger(0.1) });
    }
  }, [typingDone, levelTypingDone]);

  return (
    <div className="flex gap-10 w-full">
      <section className="flex flex-col w-1/2 gap-4">
        <div className="flex justify-start">
          <Button disabled={isStarted} onClick={beginPractice}>
            Begin Practice
          </Button>
        </div>

        <Card className="w-full min-h-[620px] max-h-[620px] overflow-scroll hide-scrollbar px-4 ">
          {!loading && isStarted ? (
            <PromptGenerator
              user={user}
              typingDone={typingDone}
              setTypingDone={setTypingDone}
              stackSelected={stackSelected}
              setStackSelected={setStackSelected}
              levelSelected={levelSelected}
              isYes={isYes}
              setIsYes={setIsYes}
              showLevel={showLevel}
              isLevel={isLevel}
              setLevelTypingDone={setLevelTypingDone}
              generateTask={generateTask}
            />
          ) : (
            <div
              className={`${
                generation || isGenerating ? "hidden" : ""
              } flex items-center h-full justify-center`}
            >
              <GiArtificialHive className="text-8xl " />
            </div>
          )}
          <TaskGenerator isGenerating={isGenerating} generation={generation} />
        </Card>
      </section>
      <section className="w-1/2 flex flex-col gap-4">
        <CodingEditor systemTheme={systemTheme} />
      </section>
    </div>
  );
};

export default page;
