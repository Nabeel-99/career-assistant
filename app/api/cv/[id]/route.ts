import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { Prisma } from "@/lib/generated/prisma";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
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

    const { id } = await params;
    console.log("cv id", id);
    if (id) {
      const cv = await prisma.cVBuilder.findUnique({
        where: { id: Number(id) },
      });

      if (!cv || cv.userId !== token.id) {
        return NextResponse.json({ message: "cv not found" }, { status: 404 });
      }

      await prisma.cVBuilder.delete({
        where: { id: Number(id) },
      });

      return NextResponse.json(
        { message: "cv deleted successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error deleting cv:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
