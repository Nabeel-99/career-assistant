import React from "react";
import { Card } from "./ui/card";
import { RiUserVoiceFill } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@/lib/generated/prisma";

const CallCard = ({ user }: { user: User | null }) => {
  return (
    <Card className="w-full @container/card  bg-[#0a0a0a] p-6 lg:p-10 xl:w-[1050px] flex flex-col gap-10  h-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Frontend Developer Interview</h1>
        <p className="font-medium">
          Level: <span>Mid Level</span>
        </p>
        <p className="italic text-subheadline">
          A mock interview for a mid-level frontend developer position at Tesco
          Technology, focusing on JavaScript, React, and Node.js skills
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex items-center bg-[#111111] xl:p-20 justify-center">
          <div className="flex items-center">
            <RiUserVoiceFill className="size-24 xl:size-44 " />
          </div>
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
        </Card>
      </div>
      {/* transcripts */}
    </Card>
  );
};

export default CallCard;
