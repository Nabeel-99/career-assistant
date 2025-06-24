import React from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import CreatePracticeBtn from "@/components/practiceui/CreatePracticeBtn";
import PracticeCard from "@/components/practiceui/PracticeCard";
import PracticeCardGrid from "@/components/practiceui/PracticeCardGrid";
import PracticeWrapper from "@/components/practiceui/PracticeWrapper";

const page = async () => {
  const session = await auth();
  if (!session?.user?.id) return null;

  return (
    <div className="flex flex-col gap-10">
      <PracticeWrapper userId={session?.user.id} />
    </div>
  );
};

export default page;
