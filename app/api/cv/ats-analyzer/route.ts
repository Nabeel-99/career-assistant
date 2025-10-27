import { analyzeATS } from "@/lib/ai/resume";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error pdf-parse has no types
import pdfParse from "pdf-parse";
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

    const formData = await req.formData();
    const jobTitle = formData.get("jobTitle") as string;
    const jobDescription = formData.get("jobDescription") as string;
    const resume = formData.get("resume") as File | null;
    if (!resume) {
      return NextResponse.json(
        { message: "No resume uploaded" },
        { status: 400 }
      );
    }
    const arrayBuffer = await resume.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const parsed = await pdfParse(buffer);
    if (parsed.text) {
      const atsFeedback = await analyzeATS(
        parsed.text,
        jobDescription,
        jobTitle
      );
      return NextResponse.json({ atsFeedback }, { status: 200 });
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
