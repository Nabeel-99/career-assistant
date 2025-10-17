"use client";
import { fetchPracticeById } from "@/lib/action";
import { Prisma, User } from "@/lib/generated/prisma";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getDevIconUrl, mapLevel } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { FaArrowUp } from "react-icons/fa6";
import { IoMicOutline } from "react-icons/io5";

import { Button } from "../ui/button";
import { SiGooglegemini } from "react-icons/si";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import TextType from "../Animations/TextType";
import { TextAI } from "@/lib/ai/textBased";
import { readStreamableValue } from "@ai-sdk/rsc";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { FaStop } from "react-icons/fa";
import PracticeHeaderSkeleton from "../skeletons/PracticeHeaderSkeleton";

type PracticeWithQuestions = Prisma.PracticeGetPayload<{
  include: { questions: true };
}>;
const ChatInterface = ({ id, user }: { id: string; user: User }) => {
  const [loading, setLoading] = useState(false);
  const [practice, setPractice] = useState<PracticeWithQuestions | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [input, setInput] = useState("");

  const [isAtBottom, setIsAtBottom] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const fetchInterview = async () => {
    try {
      setLoading(true);
      const res = await fetchPracticeById(id);
      console.log("res", res);
      setPractice(res);
    } catch (error) {
      toast.error("Error fetching interview");
    } finally {
      setLoading(false);
    }
  };
  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onFinish: (options) => {
      console.log("messages", options.message);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleStart = async () => {
    try {
      setHasStarted(true);
      sendMessage({
        parts: [{ type: "text", text: "Start" }],
        metadata: {
          questions: practice?.questions.map((q) => q.question),
          numberOfQuestions: practice?.questions.length,
          username: user?.firstname || "user",
        },
      });
    } catch (error) {
      console.log("error", error);
    } finally {
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      sendMessage({
        parts: [{ type: "text", text: input }],
        metadata: {
          questions: practice?.questions.map((q) => q.question),
          numberOfQuestions: practice?.questions.length,
          username: user?.firstname || "user",
        },
      });
      setInput("");
    } catch (error) {
      console.log("error", error);
    }
  };

  const level = practice?.level as keyof typeof mapLevel;
  useEffect(() => {
    fetchInterview();
  }, [id]);

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      messagesContainerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    setIsAtBottom(distanceFromBottom < 5);
  };
  useEffect(() => {
    if (isAtBottom && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isAtBottom]);

  return (
    <Card className="w-full mx-auto relative @container/card  dark:bg-[#0a0a0a] transition-all duraiton-300 ease-in-out p-6 lg:p-10 max-h-screen lg:max-h-[680px] xl:w-[1050px] flex flex-col items-  gap-10 2xl:container  2xl:max-h-[1000px]  h-full">
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="hide-scrollbar overflow-y-auto flex-1 "
      >
        {loading ? (
          <PracticeHeaderSkeleton />
        ) : (
          practice && (
            <div className="flex flex-col absolute bg-white dark:bg-[#0a0a0a] mask-b-from-90% z-20  pt-10 rounded-t-xl pb-10 border-none  top-0 right-0 left-0 gap-2">
              <div className="flex  flex-col gap-4 md:flex-row items-start  md:justify-between px-4 lg:px-10">
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-bold">{practice?.title}</h1>
                  {practice?.level && (
                    <p className="font-medium">
                      Level: <span>{mapLevel[level]?.title}</span>
                    </p>
                  )}
                </div>
                <div className="*:data-[slot=avatar]:ring-[#c3c3c3] dark:*:data-[slot=avatar]:ring-[#4b4b4b] order-first md:order-last flex -space-x-1 *:data-[slot=avatar]:ring-2 ">
                  {practice?.stacks.map((stack: string, index: any) => (
                    <Avatar className="size-6" key={index}>
                      <AvatarImage
                        src={getDevIconUrl(stack)}
                        alt={stack}
                        className="backdrop-blur-lg rounded-full bg-white/40"
                      />
                      <AvatarFallback>{stack}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
              <p className="italic text-subheadline px-4 lg:px-10">
                {practice?.description}.
              </p>
              {!hasStarted && (
                <div className="px-4 lg:px-10">
                  {" "}
                  <Button
                    onClick={handleStart}
                    className="flex items-center gap-2 bg-blue-800 hover:bg-blue-600 text-white"
                  >
                    Start <SiGooglegemini />
                  </Button>
                </div>
              )}
            </div>
          )
        )}

        <div className="mt-60 pt-10 md:mt-40 pb-20 ">
          {status === "submitted" && <span>Ai is typing</span>}
          {/* {status === "streaming" && <span>Ai is typing</span>} */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-4 flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`inline-block max-w-[80%] h-full p-3 rounded-lg whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-black dark:bg-[#171717]  text-white"
                    : "bg-gray-100 dark:bg-zinc-800"
                }`}
              >
                {msg.parts.map((part, i) => {
                  if (part.type === "text") {
                    const cleanText = part.text.replace(/\n{2,}/g, "\n\n");
                    return <span key={i}>{cleanText}</span>;
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className=" absolute rounded-b-xl   bg-white dark:bg-[#0a0a0a] bottom-0 left-0 right-0 px-4 lg:px-10">
        <form
          onSubmit={handleSubmit}
          className="border mb-4 p-2 rounded-xl bg-white/90   dark:bg-[#171717]  backdrop-blur-md w-full  flex  gap-4 items-end "
        >
          <Textarea
            placeholder="type here..."
            value={input}
            disabled={!hasStarted}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="max-h-60 bg-transparent dark:bg-[#171717] border-none border-0 w-full min-h-0 flex items-center focus-visible:ring-0 resize-none shadow-none"
          />
          <div className="flex items-center gap-1">
            <button type="button" className="p-2 rounded-full">
              <IoMicOutline className="size-5" />
              <span className="sr-only">mic</span>
            </button>
            {status === "streaming" ? (
              <button
                type="button"
                onClick={stop}
                disabled={
                  !hasStarted || (!input.trim() && status !== "streaming")
                }
                className="p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/60 rounded-full bg-black"
              >
                <FaStop className="size-3 text-white" />
                <span className="sr-only">stop</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!hasStarted || !input.trim()}
                className="p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/60 rounded-full bg-black"
              >
                <FaArrowUp className="size-3 text-white" />
                <span className="sr-only">send</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </Card>
  );
};

export default ChatInterface;
