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
import { readStreamableValue } from "@ai-sdk/rsc";
import TaskGenerator from "@/components/practiceui/TaskGenerator";
import PromptGenerator from "@/components/practiceui/PromptGenerator";
import CodingEditor from "@/components/practiceui/CodingEditor";
import { extractJSONFromText, generateCodingTask } from "@/lib/ai/coding";

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
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const beginPractice = () => {
    setGeneration("");
    setIsGenerating(false);
    setStackSelected(null);
    setLevelSelected(null);
    setIsYes(false);
    setIsLevel(false);
    setLevelTypingDone(false);
    setTypingDone(false);
    setIsSetupComplete(false);
    setIsStarted(true);
  };
  const showLevel = () => setIsLevel(true);

  const generateAnotherTask = async () => {
    try {
      const oldKeywords = JSON.parse(
        sessionStorage.getItem("keywords") || "[]"
      );
      setIsGenerating(true);
      setGeneration("");

      const { output } = await generateCodingTask(
        [`${stackSelected}`],
        `${levelSelected}`,
        oldKeywords
      );

      let fullText = "";
      for await (const chunk of readStreamableValue(output)) {
        fullText += chunk;
        setGeneration((currentGeneration) => `${currentGeneration}${chunk}`);

        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      sessionStorage.setItem("lastTask", fullText);
      const jsonData = await extractJSONFromText(fullText);

      if (jsonData) {
        const newKeyword = jsonData.keywords;
        const updatedKeywords = [...oldKeywords, newKeyword];
        sessionStorage.setItem("keywords", JSON.stringify(updatedKeywords));
      }
    } catch (error) {
      toast.error("Error generating task");
    } finally {
      setIsGenerating(false);
    }
  };
  const generateTask = async (level: string) => {
    try {
      const oldKeywords = JSON.parse(
        sessionStorage.getItem("keywords") || "[]"
      );
      setLevelSelected(level);
      setIsGenerating(true);
      setIsSetupComplete(true);
      setGeneration("");
      setIsStarted(false);

      const { output } = await generateCodingTask(
        [`${stackSelected}`],
        `${levelSelected}`,
        oldKeywords
      );

      let fullText = "";
      for await (const chunk of readStreamableValue(output)) {
        fullText += chunk;
        setGeneration((currentGeneration) => `${currentGeneration}${chunk}`);

        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      sessionStorage.setItem("lastTask", fullText);
      const jsonData = await extractJSONFromText(fullText);

      if (jsonData) {
        const newKeyword = jsonData.keywords;
        const updatedKeywords = [...oldKeywords, newKeyword];
        sessionStorage.setItem("keywords", JSON.stringify(updatedKeywords));
      }
    } catch (error) {
      toast.error("Error generating task");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const lastTask = sessionStorage.getItem("lastTask");
    if (lastTask) {
      setGeneration(lastTask);
    }
  }, []);

  useEffect(() => {
    sidebar.setOpen(false);
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
      animate(".stack", { opacity: 1, y: 0 }, { delay: stagger(0.1) });
    }
    if (levelTypingDone) {
      animate(".level", { opacity: 1, y: 0 }, { delay: stagger(0.1) });
    }
  }, [typingDone, levelTypingDone]);

  return (
    <div className="flex flex-col md:flex-row gap-10 w-full">
      <section className="flex flex-col lg:w-1/2 gap-4">
        <div className="flex justify-start">
          {!isSetupComplete ? (
            <Button disabled={isStarted} onClick={beginPractice}>
              Start Practice
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                disabled={isGenerating}
                onClick={generateAnotherTask}
                variant="default"
              >
                Next Challenge
              </Button>
              <Button
                disabled={isGenerating}
                onClick={beginPractice}
                variant="outline"
              >
                Reset
              </Button>
            </div>
          )}
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
      <section className="lg:w-1/2 flex flex-col gap-4">
        <CodingEditor systemTheme={systemTheme} />
      </section>
    </div>
  );
};

export default page;
