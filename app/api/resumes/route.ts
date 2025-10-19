import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const GET = async (req: NextRequest) => {
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
    const resumes = await prisma.resume.findMany({
      where: {
        userId: token.id,
        filePath: { not: null },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        filePath: true,
      },
    });
    return NextResponse.json(
      {
        resumes,
      },
      { status: 200 }
    );
  } catch (error) {
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
    const { id } = await req.json();
    const resume = await prisma.resume.findUnique({
      where: { id },
    });
    if (!resume || resume.userId !== token.id) {
      return NextResponse.json(
        { message: "Resume not found" },
        { status: 404 }
      );
    }

    // delete from cloudinary
    if (resume.cloudinaryId) {
      await cloudinary.uploader.destroy(resume.cloudinaryId);
    }
    // delete from db
    await prisma.resume.update({
      where: { id },
      data: {
        rawText: null,
        filePath: null,
        cloudinaryId: null,
      },
    });
    const remainingResumes = await prisma.resume.count({
      where: { userId: token.id },
    });

    if (remainingResumes === 0) {
      await prisma.user.update({
        where: { id: token.id },
        data: { hasResume: false },
      });
    }

    return NextResponse.json(
      { message: "Resume deleted successfully" },
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
