"use client";

import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Prisma, User } from "@/lib/generated/prisma";
import { MdCallEnd } from "react-icons/md";
import { fetchPracticeById } from "@/lib/action";
import CallCardSkeleton from "../CallCardSkeleton";
import { cn, mapLevel } from "@/lib/utils";
import { Button } from "../ui/button";
import { assistant, vapi } from "@/lib/vapi";
import { RiSpeakAiFill } from "react-icons/ri";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ImSpinner9 } from "react-icons/im";
interface Message {
  role: string;
  text: string;
}

type PracticeWithQuestions = Prisma.PracticeGetPayload<{
  include: { questions: true };
}>;

const CallCard = ({ user, id }: { user: User | null; id: string }) => {
  const [practice, setPractice] = useState<PracticeWithQuestions | null>(null);
  const [loading, setLoading] = useState(false);
  const level = practice?.level as keyof typeof mapLevel;
  const formattedQuestions = practice?.questions
    .map((q, i) => `${i + 1}. ${q.question}`)
    .join("\n");

  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<Message[]>([]);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    vapi.on("call-start", () => {
      console.log("call started");
      setIsConnected(true);
    });
    vapi.on("call-end", () => {
      console.log("call ended");
      setIsConnected(false);
      setIsSpeaking(false);
    });
    vapi.on("speech-start", () => {
      console.log("speech started");
      setIsSpeaking(true);
    });
    vapi.on("speech-end", () => {
      console.log("speech ended");
      setIsSpeaking(false);
    });

    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role,
            text: message.transcript,
          },
        ]);
      }
    });

    vapi.on("error", (error) => {
      console.log("error", error);
    });

    return () => {
      vapi.stop();
    };
  }, []);
  const fetchInterview = async () => {
    try {
      setLoading(true);
      const res = await fetchPracticeById(id);
      console.log("res", res);
      setPractice(res);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterview();
  }, []);

  const startCall = async () => {
    try {
      setStarting(true);
      await vapi.start(
        assistant(user?.firstname!, formattedQuestions!, practice?.role!)
      );
    } catch (error) {
      console.log("error", error);
    } finally {
      setStarting(false);
    }
  };

  const endCall = () => {
    vapi.stop();
  };
  return (
    <div className="flex flex-col xl:flex-row gap-10 h-full w-full">
      {loading ? (
        <CallCardSkeleton />
      ) : (
        <>
          <Card className="w-full @container/card  bg-[#0a0a0a] p-6 lg:p-10 xl:w-[1050px] flex flex-col gap-10  h-full">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold">{practice?.title}</h1>
              <p className="font-medium">
                Level: <span>{mapLevel[level]?.title}</span>
              </p>
              <p className="italic text-subheadline">
                {practice?.description}.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="flex flex-col  gap-5 items-center bg-[#111111] xl:p-20 justify-center">
                <div className={cn(isSpeaking && "text-sky-500 animate-pulse")}>
                  <RiSpeakAiFill className="size-24 xl:ml10 xl:size-44 " />
                </div>
                <p className="lg:text-xl font-bold">AI Interviewer</p>
              </Card>
              <Card className="flex items-center bg-[#111111] xl:p-20 justify-center">
                <div className="flex items-center bg-black rounded-full">
                  <Avatar className="size-24 xl:size-44">
                    <AvatarImage src={user?.image!} />
                    <AvatarFallback className="flex items-center">
                      <span className="text-[100px]">
                        {user?.firstname?.charAt(0)}{" "}
                      </span>
                      <span className="text-[100px]">
                        {user?.lastname?.charAt(0)}
                      </span>
                    </AvatarFallback>
                  </Avatar>
                </div>
                <p className="lg:text-xl font-bold">
                  {user?.firstname} {user?.lastname}
                </p>
              </Card>
            </div>
            {/* transcripts */}
            {isConnected ? (
              <div className="border rounded-lg py-6 px-4 min-h-10 flex space-y-2 items-center justify-center text-center">
                {transcript.length === 0 ? (
                  <span className="text-subheadline">
                    Conversation will appear here
                  </span>
                ) : (
                  transcript.map((m, i) => (
                    <div key={i} className="mb-2">
                      <span
                        className={
                          m.role === "user" ? "text-white" : "text-sky-500"
                        }
                      >
                        {m.role === "user" ? "You" : "AI"}:{" "}
                      </span>
                      <span>{m.text}</span>
                    </div>
                  ))
                )}
              </div>
            ) : (
              // start call
              <div className="flex items-center justify-center">
                <Button
                  onClick={startCall}
                  disabled={starting}
                  className="px-8 text-lg py-6 text-white bg-green-600 hover:bg-green-500"
                >
                  {starting ? (
                    <span>
                      {" "}
                      <ImSpinner9 className="animate-spin w-full" />
                    </span>
                  ) : (
                    "Start"
                  )}
                </Button>
              </div>
            )}
          </Card>
          <div className="flex flex-col h-full items-center gap-6 justify-start">
            {/* <div className="flex items-center justify-center border bg-[#1f1f1f]  p-6 rounded-full">
              <FaMicrophone className="size-10" />
            </div> */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center justify-center border bg-red-700 hover:bg-red-600 cursor-pointer p-6 rounded-full"
                  onClick={endCall}
                >
                  <MdCallEnd className="size-10" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>End Call</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
};

export default CallCard;
