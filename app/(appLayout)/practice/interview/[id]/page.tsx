import { auth } from "@/auth";
import CallCard from "@/components/CallCard";
import prisma from "@/lib/prisma";
import React from "react";
import { FaMicrophone } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";

const page = async ({ params }: { params: { id: number } }) => {
  const id = (await params).id;
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });
  console.log("id", id);
  console.log("user", user);
  return (
    <div className="flex flex-col xl:flex-row gap-10 h-full w-full">
      <CallCard user={user} />
      <div className="flex flex-col h-full items-center gap-6 justify-start">
        <div className="flex items-center justify-center border bg-[#1f1f1f]  p-6 rounded-full">
          <FaMicrophone className="size-10" />
        </div>
        <div className="flex items-center justify-center border bg-[#1f1f1f]  p-6 rounded-full">
          <MdCallEnd className="size-10" />
        </div>
      </div>
    </div>
  );
};

export default page;
