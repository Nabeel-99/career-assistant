"use client";

import React, { useEffect, useState } from "react";
import CreatePracticeBtn from "./CreatePracticeBtn";
import PracticeCardGrid from "./PracticeCardGrid";
import { fetchPractices } from "@/lib/action";
import { PracticeWithFeedback } from "@/lib/types";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { generateCodingTask } from "@/lib/ai";
import { readStreamableValue } from "@ai-sdk/rsc";
import ReactMarkdown from "react-markdown";
import { Streamdown } from "streamdown";
import { extractJSONFromText } from "@/lib/utils";
import { Card } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import Orb from "../Animations/AnimatedContent/Orb";

const PracticeWrapper = ({ userId }: { userId: string }) => {
  const [practices, setPractices] = useState<PracticeWithFeedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [generation, setGeneration] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [jsonData, setJsonData] = useState<any>(null);

  const getUserPractices = async () => {
    try {
      setLoading(true);
      const res = await fetchPractices(userId);
      setPractices(res);
    } catch (error) {
      toast.error("Error fetching practices");
    } finally {
      setLoading(false);
    }
  };

  const generateTask = async () => {
    try {
      setIsGenerating(true);
      setGeneration("");
      setJsonData(null);

      const { output } = await generateCodingTask(["golang"], "beginner", [
        "GoLang, structs, slices, filtering, error handling, beginner",
        "Maps, String Manipulation, Counting, Functions",
      ]);

      console.log("🔍 Generated output:", output);

      let fullText = "";
      for await (const chunk of readStreamableValue(output)) {
        console.log("📝 Streaming chunk:", chunk);
        fullText += chunk;
        setGeneration((currentGeneration) => `${currentGeneration}${chunk}`);
      }

      const res = extractJSONFromText(fullText);
      setJsonData(res?.clientJson);

      setIsGenerating(false);
    } catch (error) {}
  };

  useEffect(() => {
    getUserPractices();
  }, [userId]);
  return (
    <>
      <Tabs defaultValue="coding">
        <TabsList>
          <TabsTrigger value="theoretical">Theoretical</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
        </TabsList>
        <TabsContent value="theoretical">
          <div className="flex flex-col gap-4 mt-4">
            <CreatePracticeBtn
              userId={userId}
              getUserPractices={getUserPractices}
            />
            <PracticeCardGrid
              practices={practices}
              loading={loading}
              getUserPractices={getUserPractices}
            />
          </div>
        </TabsContent>
        <TabsContent value="coding">
          <div className="dark-code-bg light-code-bg relative  border rounded-lg overflow-hidden min-h-[500px] md:min-h-[600px] md:max-h-[600px] h-full flex items-center w-full justify-center">
            <Orb
              hoverIntensity={0}
              hue={0}
              forceHoverState={true}
              className="hidden md:flex items-center justify-center"
            />
            {/* <div className="absolute  top-1/2 left-0 w-[300px] h-[300px] rounded-full rotate-45 blur-[70px] bg-radial-[at_75%_25%] from-[#fcfcfc] dark:from-[#0a0a0a] from-0% to-[#d8c1f6] dark:to-[#5227FF] to-100%"></div>
            <div className="absolute -top-10 -right-20 w-[300px] h-[300px] rounded-full rotate-45 blur-[100px] bg-radial-[at_75%_25%] from-[#fcfcfc] dark:from-[#0a0a0a] from-0% to-[#d8c1f6] dark:to-[#5227FF]  to-100%"></div> */}
            <div className="md:absolute md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:left-1/2 flex flex-col  gap-2 items-center">
              <Image
                src={"/codingicon.webp"}
                width={200}
                height={200}
                alt="coding icon"
              />
              <h2 className="text-2xl font-bold">AI-Powered Coding Room</h2>
              <p className="text-center">
                Get challenges generated just for <br /> you and code in real
                time.
              </p>
              <Link href={"/practice/coding"}>
                <Button className="mt-4">Enter Room</Button>
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default PracticeWrapper;
