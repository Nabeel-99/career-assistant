import { generateQuestions } from "@/lib/ai";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      secureCookie: isProduction,
    });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { jobDescription, experienceLevel, resume } = await req.json();
    const interview = await generateQuestions(
      jobDescription,
      resume,
      experienceLevel
    );
    if (interview) {
      const result = await prisma.practice.create({
        data: {
          title: interview.title,
          description: interview.description,
          stacks: interview.stacks,
          role: interview.role,
          resumeText: resume,
          level: experienceLevel,
          questions: {
            create: interview.questions.map((q: string) => ({
              question: q,
            })),
          },
          userId: token.id,
        },
      });

      return NextResponse.json({ message: "Success" }, { status: 200 });
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
