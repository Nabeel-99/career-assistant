"use client";

import { Prisma } from "@/lib/generated/prisma";
import { getDevIconUrl, mapLevel } from "@/lib/utils";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SiGooglegemini } from "react-icons/si";
type PracticeWithQuestions = Prisma.PracticeGetPayload<{
  include: { questions: true };
}>;
type PracticeHeaderProps = {
  practice: PracticeWithQuestions;
  hasStarted: boolean;
  handleStart: () => void;
  level: "entry-level" | "mid-level" | "senior-level";
};

const PracticeHeader = ({
  practice,
  hasStarted,
  handleStart,
  level,
}: PracticeHeaderProps) => {
  return (
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
  );
};

export default PracticeHeader;
