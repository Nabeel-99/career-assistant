"use server";

import { auth } from "@/auth";
import { Transcript } from "../types";
import { generateFeedback } from "../ai/interview";
import prisma from "../prisma";

export const createFeedback = async (
  transcript: Transcript[],
  practiceId: string
): Promise<{ success: boolean; message: string }> => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  if (!transcript || transcript.length === 0) {
    return { success: false, message: "No conversation recorded" };
  }

  const userResponses = transcript.filter((t) => t.role === "user");

  if (userResponses.length < 2) {
    return {
      success: false,
      message:
        "Not enough responses to generate feedback. Please answer at least 2 questions.",
    };
  }

  const hasSubstantialContent = userResponses.some(
    (response) => response.text.trim().split(" ").length >= 5
  );

  if (!hasSubstantialContent) {
    return {
      success: false,
      message: "Your responses are too short to generate meaningful feedback.",
    };
  }

  try {
    const aiFeedback = await generateFeedback(transcript);
    if (!aiFeedback.comment || aiFeedback.comment.trim().length === 0) {
      return {
        success: false,
        message:
          "Unable to generate feedback from the conversation. Please try answering more questions.",
      };
    }

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

    return { success: true, message: "Feedback created successfully" };
  } catch (error) {
    console.error("Feedback generation error:", error);
    return {
      success: false,
      message:
        "There wasn't enough conversation to provide meaningful feedback.",
    };
  }
};
