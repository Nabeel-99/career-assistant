"use server";

import bcrypt from "bcrypt";
import prisma from "./prisma";
import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { generateFeedback } from "./ai";
import { Transcript } from "./types";
import { Prisma } from "./generated/prisma";
export const signup = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}) => {
  const { firstname, lastname, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        isUserNew: false,
      },
    });
    return user;
  } catch (error: any) {
    if (
      error?.code === "P2002"
      // error?.message?.includes("Unique constraint failed")
    ) {
      const err = new Error("EMAIL_EXISTS");
      throw err;
    }
    throw error;
  }
};

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
export const signInWithGoogle = async () => {
  await signIn("google");
};

export const signInWithGithub = async () => {
  await signIn("github");
};

export const signOutAction = async () => {
  await signOut({ redirect: false });
  redirect("/");
};

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
  const resumes = await prisma.resume.findMany({
    where: {
      userId,
      content: {
        not: Prisma.JsonNull,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return resumes;
};
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
export const createFeedback = async (
  transcript: Transcript[],
  practiceId: string
): Promise<{ success: boolean; message: string }> => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  if (!transcript || transcript.length === 0) {
    return { success: false, message: "Transcript is empty" };
  }
  try {
    const aiFeedback = await generateFeedback(transcript);
    if (!aiFeedback || !aiFeedback.comment?.trim()) {
      return {
        success: false,
        message: "Feedback was empty or could not be generated",
      };
    }
    if (aiFeedback) {
      await prisma.practice.update({
        where: { id: Number(practiceId) },
        data: { isTaken: true },
      });

      await prisma.feedback.upsert({
        where: { practiceId: Number(practiceId) },
        update: {
          comment: aiFeedback.comment,
          score: aiFeedback.totalScore,
        },
        create: {
          practiceId: Number(practiceId),
          comment: aiFeedback.comment,
          score: aiFeedback.totalScore,
        },
      });
    }
    return { success: true, message: "Feedback created successfully" };
  } catch (error) {
    return { success: false, message: "Error creating feedback" };
  }
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

export const fetchRecentActivity = async () => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const userId = session.user.id;
  const resumes = await prisma.resume.findMany({
    where: { userId },
    select: {
      id: true,
      template: true,
      createdAt: true,
    },
  });

  const practices = await prisma.practice.findMany({
    where: { userId },
    select: {
      id: true,
      createdAt: true,
    },
  });

  const activity = [
    ...resumes.map((r) => ({
      type: r.template ? "template" : "resume",
      name: r.template || "Resume",
      timestamp: r.createdAt,
    })),
    ...practices.map((p) => ({
      type: "practice",
      name: "Mock Interview",
      timestamp: p.createdAt,
    })),
  ];

  // Sort by time descending
  const sorted = activity.sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );
  return sorted[0];
};
