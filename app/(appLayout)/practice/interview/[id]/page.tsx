import { auth } from "@/auth";
import CallCard from "@/components/practiceui/CallCard";
import prisma from "@/lib/prisma";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    include: {
      resumes: true,
    },
  });
  return <CallCard user={user} id={id} />;
};

export default page;
