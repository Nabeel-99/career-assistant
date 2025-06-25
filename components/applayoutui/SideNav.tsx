import React from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import SideNavWrapper from "../SideNavWrapper";

const SideNav = async () => {
  const session = await auth();
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });

  return <SideNavWrapper user={user} />;
};

export default SideNav;
