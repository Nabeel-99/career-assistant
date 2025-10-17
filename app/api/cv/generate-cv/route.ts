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
    const formData = await req.formData();
    const resumeId = JSON.parse(formData.get("resumeId") as string);
    const content = JSON.parse(formData.get("content") as string);
    const templateName = JSON.parse(formData.get("templateName") as string);
    const imageFile = formData.get("image") as File | null;

    let imageUrl = "";

    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload new avatar to Cloudinary
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: `${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME}/avatars`,
              public_id: `${token.id}-${Date.now()}`,
              overwrite: false,
              resource_type: "image",
              transformation: [
                { width: 500, height: 500, crop: "fill", gravity: "face" },
                { quality: "auto" },
                { fetch_format: "auto" },
              ],
            },
            (err, result) => {
              err ? reject(err) : resolve(result);
            }
          )
          .end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    const resume = await prisma.resume.update({
      where: {
        id: Number(resumeId),
      },
      data: {
        content: {
          ...content,
          image: imageUrl,
        },
        template: templateName,
      },
    });
    return NextResponse.json(
      { message: "Resume Content Updated", data: resume },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
