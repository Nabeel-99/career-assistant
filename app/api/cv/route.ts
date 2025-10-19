import { generateCV } from "@/lib/ai/resume";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
