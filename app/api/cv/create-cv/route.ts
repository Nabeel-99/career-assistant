import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
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
    const imageFilePath = JSON.parse(formData.get("imageFilePath") as string);
    const data = {
      image: imageFilePath,
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
    await prisma.resume.create({
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
    console.log("error", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
