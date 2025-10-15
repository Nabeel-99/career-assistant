import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const PUT = async (req: NextRequest) => {
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

    // Get user's current avatar to delete old one
    const user = await prisma.user.findUnique({
      where: { id: token.id as string },
      select: { cloudinaryAvatarId: true },
    });

    // Delete old avatar from Cloudinary if exists
    if (user?.cloudinaryAvatarId) {
      try {
        await cloudinary.uploader.destroy(user.cloudinaryAvatarId);
      } catch (error) {
        console.error("Error deleting old avatar:", error);
      }
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload new avatar to Cloudinary
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME}/avatars`,
            public_id: token.id as string,
            overwrite: true,
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

    const avatarUrl = uploadResult.secure_url;
    const avatarId = uploadResult.public_id;

    // Update user with new avatar
    await prisma.user.update({
      where: {
        id: token.id as string,
      },
      data: {
        image: avatarUrl,
        cloudinaryAvatarId: avatarId,
      },
    });

    return NextResponse.json(
      {
        message: "Avatar uploaded successfully",
        avatarUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return NextResponse.json(
      { message: "Error uploading file" },
      { status: 500 }
    );
  }
};
