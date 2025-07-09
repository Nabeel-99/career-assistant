import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const formData = await req.formData();

    const image = formData.get("image") as File | null;
    const fullname = formData.get("fullname") as string;
    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;

    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const location = formData.get("location") as string;

    const links = JSON.parse(formData.get("links") as string);
    const education = JSON.parse(formData.get("education") as string);
    const experience = JSON.parse(formData.get("experience") as string);
    const projects = JSON.parse(formData.get("projects") as string);
    const skills = JSON.parse(formData.get("skills") as string);
    const languages = JSON.parse(formData.get("languages") as string);
    const awards = JSON.parse(formData.get("awards") as string);
  } catch (error) {}
};
