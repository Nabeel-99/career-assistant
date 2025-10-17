import { auth } from "@/auth";
import ChatInterface from "@/components/practiceui/ChatInterface";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });
  if (!user) return null;
  console.log("user", user);

  return <ChatInterface id={id} user={user} />;
};

export default page;
