"use server";
import prisma from "../prisma";
import { auth } from "@/auth";

export const fetchRecentActivity = async () => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const userId = session.user.id;
  const resumes = await prisma.cVBuilder.findMany({
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
