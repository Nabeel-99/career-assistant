import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error pdf-parse has no types
import pdfParse from "pdf-parse";
import prisma from "@/lib/prisma";
export const POST = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token) {
      console.log("no token");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log("token", token);
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const filePath = formData.get("filePath") as string;
    console.log("filepath", filePath);
    if (!file) {
      console.log("no file");
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const parsed = await pdfParse(buffer);
    console.log("parsed", parsed.text);
    if (parsed.text) {
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
