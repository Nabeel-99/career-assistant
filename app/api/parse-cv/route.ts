import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error pdf-parse has no types
import pdfParse from "pdf-parse";
import prisma from "@/lib/prisma";
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
    const file = formData.get("file") as File;
    const filePath = formData.get("filePath") as string;
    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const parsed = await pdfParse(buffer);
    if (parsed.text) {
      await prisma.user.update({
        where: {
          id: token.id,
        },
        data: {
          hasResume: true,
        },
      });
      await prisma.resume.create({
        data: {
          name: file.name,
          rawText: parsed.text,
          userId: token.id as string,
          filePath: filePath,
        },
      });
    }
    return NextResponse.json(
      { message: "File uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
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
    const { filePath } = await req.json();
    console.log("filePath", filePath);
    if (filePath) {
      await prisma.resume.deleteMany({
        where: {
          filePath: filePath,
        },
      });
      const resumes = await prisma.resume.findMany({
        where: {
          userId: token.id,
        },
      });
      if (resumes.length === 0) {
        await prisma.user.update({
          where: {
            id: token.id,
          },
          data: {
            hasResume: false,
          },
        });
      }

      return NextResponse.json(
        { message: "File deleted successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
