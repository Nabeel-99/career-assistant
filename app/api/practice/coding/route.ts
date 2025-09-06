import { generateCodingTask } from "@/lib/ai";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
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
    const { stacks, level } = await req.json();
    const task = await generateCodingTask(stacks, level);
    // if (task) {
    //   await prisma.practice.create({
    //     data: {
    //       userId: token.id,
    //       title: task.title,
    //       description: task.description,
    //       stacks,
    //       level,
    //       type: "PRACTICAL",
    //       codingTask: {
    //         create: {
    //           question: task.question,
    //           expectedOutput: task.expectedOutput,
    //           hint: task.hint,
    //           description: task.description,
    //         },
    //       },
    //     },
    //   });

    //   return NextResponse.json({message: "Success"}, {status: 200})
    // }
  } catch (error) {}
};
