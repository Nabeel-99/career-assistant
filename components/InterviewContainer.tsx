"use client";

import React from "react";
import { Card } from "./ui/card";
import { RiSpeakAiFill } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ImSpinner9 } from "react-icons/im";
import { User } from "@/lib/generated/prisma";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { MdCallEnd } from "react-icons/md";
import { cn, getDevIconUrl, mapLevel } from "@/lib/utils";
import { Transcript } from "@/lib/types";

type InterviewProps = {
  practice: any;
  isSpeaking: boolean;
  user: User | null;
  isConnected: boolean;
  lastMessage: Transcript | null;
  transcript: Transcript[];
  starting: boolean;
  generatingFeedback: boolean;
  startCall: () => void;
  endCall: () => void;
};
const InterviewContainer = ({
  practice,
  isSpeaking,
  user,
  isConnected,
  lastMessage,
  transcript,
  starting,
  generatingFeedback,
  startCall,
  endCall,
}: InterviewProps) => {
  const level = practice?.level as keyof typeof mapLevel;
  return (
    <>
      {generatingFeedback && (
        <div className="absolute inset-0 bg-black/80 z-50 flex items-center  justify-center">
          <div className=" flex flex-col gap-2 items-center justify-center">
            <ImSpinner9 className="animate-spin text-white text-center text-4xl" />
            <p className="animate-pulse">Generating Feedback</p>
          </div>
        </div>
      )}

      <Card className="w-full @container/card  bg-[#0a0a0a] transition-all duraiton-300 ease-in-out p-6 lg:p-10 xl:w-[1050px] flex flex-col gap-10  h-full">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 md:flex-row items-center md:justify-between">
            <h1 className="text-xl font-bold">{practice?.title}</h1>
            <div className="*:data-[slot=avatar]:ring-[#4b4b4b] order-first md:order-last flex -space-x-1 *:data-[slot=avatar]:ring-2 ">
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

          <p className="font-medium">
            Level: <span>{mapLevel[level]?.title}</span>
          </p>
          <p className="italic text-subheadline">{practice?.description}.</p>
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
          <div className="border rounded-lg py-6 px-4 min-h-10 w-full transition-all duration-200 ease-in-out   mx-auto space-y-2 items-center justify-center text-center">
            {transcript.length === 0 ? (
              <span className="text-subheadline">
                Conversation will appear here
              </span>
            ) : (
              <p
                key={lastMessage?.text}
                className={cn(
                  "transition-opacity duration-500 opacity-0",
                  "fade-in opacity-100",
                  lastMessage?.role === "user" ? "text-white" : "text-sky-300"
                )}
              >
                <span
                  className={cn(
                    lastMessage?.role === "user" ? "text-white" : "text-sky-300"
                  )}
                >
                  {lastMessage?.role === "user" ? "You: " : "AI: "}
                </span>
                {lastMessage?.text}
              </p>
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
      <div className="flex  flex-col h-full items-center gap-6 justify-start">
        {/* <div className="flex items-center justify-center border bg-[#1f1f1f]  p-6 rounded-full">
              <FaMicrophone className="size-10" />
            </div> */}

        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                "flex items-center justify-center border bg-red-700 hover:bg-red-600 cursor-pointer p-6 rounded-full",
                !isConnected && "hidden"
              )}
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
  );
};

export default InterviewContainer;
