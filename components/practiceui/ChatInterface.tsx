"use client";

import { Prisma, User } from "@/lib/generated/prisma";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { mapLevel } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import PracticeHeaderSkeleton from "../skeletons/PracticeHeaderSkeleton";
import { fetchPracticeById } from "@/lib/actions/practice";
import PracticeHeader from "../PracticeHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

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

  const fetchInterview = async () => {
    try {
      setLoading(true);
      const res = await fetchPracticeById(id);

      setPractice(res);
    } catch (error) {
      toast.error("Error fetching interview");
    } finally {
      setLoading(false);
    }
  };
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
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
            <PracticeHeader
              practice={practice}
              hasStarted={hasStarted}
              handleStart={handleStart}
              level={level}
            />
          )
        )}
        <ChatMessages
          messages={messages}
          status={status}
          messagesEndRef={messagesEndRef}
        />
      </div>
      <div className=" absolute rounded-b-xl   bg-white dark:bg-[#0a0a0a] bottom-0 left-0 right-0 px-4 lg:px-10">
        <ChatInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          stop={stop}
          hasStarted={hasStarted}
          status={status}
        />
      </div>
    </Card>
  );
};

export default ChatInterface;
