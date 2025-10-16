import { generateCV } from "@/lib/ai/resume";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const hasMissingLinks = (data: any) => {
  const links = data.links || {};
  const missingLinks = !links.linkedin || !links.github || !links.portfolio;
  const missingProjectLinks =
    data.projects?.some((project: any) => !project.link) ?? false;

  return missingLinks || missingProjectLinks;
};
export const POST = async (req: NextRequest) => {
  const isProduction = process.env.NODE_ENV === "production";
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: isProduction,
  });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { resumeId } = await req.json();
    const resume = await prisma.resume.findUnique({
      where: {
        id: Number(resumeId),
      },
    });
    let rawText = null;
    if (resume) {
      rawText = resume.rawText;
    }
    const parsedData = await generateCV(rawText!);
    if (parsedData === null) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 404 }
      );
    }

    if (hasMissingLinks(parsedData)) {
      return NextResponse.json(
        { message: "Missing links", data: parsedData },
        { status: 422 }
      );
    }

    return NextResponse.json({ data: parsedData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  const isProduction = process.env.NODE_ENV === "production";
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: isProduction,
  });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { resumeId, content, templateName, imagePath } = await req.json();
    const resume = await prisma.resume.update({
      where: {
        id: Number(resumeId),
      },
      data: {
        content: {
          ...content,
          image: imagePath,
        },
        template: templateName,
      },
    });
    return NextResponse.json(
      { message: "Resume Content Updated", data: resume },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
