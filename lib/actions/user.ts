"use server";

import { auth } from "@/auth";
import prisma from "../prisma";

export const fetchUser = async () => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });
  return user;
};

export const makeUserNewFalse = async (): Promise<{ success: boolean }> => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const userId = session.user.id;
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isUserNew: false,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
