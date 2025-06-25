import React from "react";
import { auth } from "@/auth";
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
