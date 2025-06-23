import React from "react";
import { Card } from "./ui/card";
import { RiUserVoiceFill } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { User } from "@/app/generated/prisma";

const CallCard = ({ user }: { user: User | null }) => {
  return (
    <Card className="w-full @container/card  p-10 xl:w-[1050px]  h-00px]">
      <div className="grid grid-cols-2 gap-6">
        <Card className="flex items-center bg-[#111111] p-20 justify-center">
          <div className="flex items-center">
            <RiUserVoiceFill className="size-44 " />
          </div>
        </Card>
        <Card className="flex items-center bg-[#111111] justify-center">
          <div className="flex items-center bg-black rounded-full">
            <Avatar className="size-44">
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
      <div className="flex flex-col items-center w-full  gap-10 ">
        <div className="flex items-center justify-center gap-2 w-full">
          <Button>Start Practice</Button>
        </div>
      </div>
    </Card>
  );
};

export default CallCard;
