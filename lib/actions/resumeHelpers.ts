"use server";
import { auth } from "@/auth";
import prisma from "../prisma";

export const fetchResumes = async (userId: string) => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const resumes = await prisma.resume.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return resumes.filter((res) => res.rawText !== null);
};

export const fetchResumeWithContent = async (userId: string) => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const resumes = await prisma.cVBuilder.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return resumes;
};

export const deleteUserTemplate = async (
  resumeId: number
): Promise<{ success: boolean }> => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  try {
    await prisma.resume.delete({
      where: {
        id: resumeId,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
