import React from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { MdCallEnd } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PracticeForm from "@/components/forms/PracticeForm";
import CallCard from "@/components/CallCard";
import CreatePracticeBtn from "@/components/CreatePracticeBtn";
import PracticeCard from "@/components/PracticeCard";

const page = async () => {
  const session = await auth();
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    include: {
      resumes: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  console.log("user", user);
  const resumes = user?.resumes;

  return (
    <div className="flex flex-col gap-10">
      <CreatePracticeBtn resumes={resumes ?? []} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <PracticeCard key={index} />
        ))}

        {/* <CallCard user={user} />
        <div className="flex flex-col items-center justify-center w-1/4 gap-10">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                title=""
                className="bg-green-600 cursor-pointer hover:bg-green-700 rounded-full p-4 flex items-center justify-center"
              >
                <span className="sr-only">mute</span>
                <FaMicrophone className="size-12" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>mute</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="bg-red-600 cursor-pointer hover:bg-red-700 rounded-full p-4 flex items-center justify-center">
                <span className="sr-only">end</span>
                <MdCallEnd className="size-12" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>end</p>
            </TooltipContent>
          </Tooltip>
        </div> */}
      </div>
    </div>
  );
};

export default page;
