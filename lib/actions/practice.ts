"use server";

import { auth } from "@/auth";
import prisma from "../prisma";

export const fetchPractices = async (userId: string) => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const practices = await prisma.practice.findMany({
    where: {
      userId,
    },
    include: {
      questions: true,
      feedback: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
  return practices;
};

export const fetchPracticeById = async (id: string) => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const practice = await prisma.practice.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      questions: true,
      feedback: true,
    },
  });
  if (!practice) {
    throw new Error("Practice not found");
  }
  return practice;
};

export const deletePractice = async (
  id: number
): Promise<{ success: boolean; message: string }> => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  try {
    await prisma.practice.deleteMany({
      where: {
        id: id,
      },
    });
    return { success: true, message: "Deleted successfully" };
  } catch (error) {
    return { success: false, message: "Error deleting practice" };
  }
};
