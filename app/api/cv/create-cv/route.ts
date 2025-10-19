import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
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

    const fullname = JSON.parse(formData.get("fullname") as string);
    const title = JSON.parse(formData.get("title") as string);
    const summary = JSON.parse(formData.get("summary") as string);
    const email = JSON.parse(formData.get("email") as string);
    const phone = JSON.parse(formData.get("phone") as string);
    const location = JSON.parse(formData.get("location") as string);
    const links = JSON.parse(formData.get("links") as string);
    const education = JSON.parse(formData.get("education") as string);
    const experience = JSON.parse(formData.get("experience") as string);
    const projects = JSON.parse(formData.get("projects") as string);
    const skills = JSON.parse(formData.get("skills") as string);
    const languages = JSON.parse(formData.get("languages") as string);
    const awards = JSON.parse(formData.get("awards") as string);
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

    const data = {
      image: imageUrl,
      fullname,
      title,
      summary,
      email,
      phone,
      location,
      links,
      education,
      experience,
      projects,
      skills,
      languages,
      awards,
    };
    await prisma.cVBuilder.create({
      data: {
        userId: token.id,
        template: templateName,
        content: data,
        name: `${token.firstname}-cv`,
      },
    });
    return NextResponse.json(
      { message: "Resume created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
