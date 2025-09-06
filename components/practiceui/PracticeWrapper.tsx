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

const PracticeWrapper = ({ userId }: { userId: string }) => {
  const [practices, setPractices] = useState<PracticeWithFeedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [generation, setGeneration] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

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

  useEffect(() => {
    getUserPractices();
  }, [userId]);
  return (
    <>
      <Tabs defaultValue="theoretical">
        <TabsList>
          <TabsTrigger value="theoretical">Theoretical</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
        </TabsList>
        <TabsContent value="theoretical">
          <div className="flex flex-col  gap-10">
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
          <Button
            onClick={async () => {
              setIsGenerating(true);
              setGeneration("");

              const { output } = await generateCodingTask(
                ["javascript"],
                "intermediate"
              );

              for await (const chunk of readStreamableValue(output)) {
                setGeneration(
                  (currentGeneration) => `${currentGeneration}${chunk}`
                );
              }

              setIsGenerating(false);
            }}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Coding Challenge"}
          </Button>

          {/* Show streaming markdown */}
          {generation && (
            <div className="mt-6">
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold  mb-4">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold  mb-3">
                        {children}
                      </h2>
                    ),
                    p: ({ children }) => (
                      <p className=" mb-3 leading-relaxed">{children}</p>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className=" px-1 py-0.5 rounded text-sm font-mono">
                          {children}
                        </code>
                      ) : (
                        <pre className=" p-4 rounded-lg overflow-x-auto">
                          <code className="text-sm">{children}</code>
                        </pre>
                      );
                    },
                    strong: ({ children }) => (
                      <strong className="font-semibold ">{children}</strong>
                    ),
                  }}
                >
                  {generation}
                </ReactMarkdown>
                {isGenerating && <span className="animate-pulse ">|</span>}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default PracticeWrapper;
