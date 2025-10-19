import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error pdf-parse has no types
import pdfParse from "pdf-parse";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
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
    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME,
            public_id: `${token.id}-${Date.now()}`,
            resource_type: "auto",
            access_mode: "public",
            type: "upload",
          },
          (err, result) => {
            err ? reject(err) : resolve(result);
          }
        )
        .end(buffer);
    });
    const resumeUrl = (uploadResult as any).secure_url;
    const resumeId = (uploadResult as any).public_id;

    // parse text from pdf
    const parsed = await pdfParse(buffer);
    if (parsed.text) {
      await prisma.user.update({
        where: {
          id: token.id,
        },
        data: {
          hasResume: true,
          isUserNew: false,
        },
      });
      await prisma.resume.create({
        data: {
          name: file.name,
          rawText: parsed.text,
          userId: token.id as string,
          filePath: resumeUrl,
          cloudinaryId: resumeId,
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
