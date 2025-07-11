import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
export const POST = async (req: NextRequest) => {
  try {
    const { token, newPassword } = await req.json();
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.AUTH_SECRET!) as jwt.JwtPayload;
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }
    const userId = decoded.user as string;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.upsert({
      where: {
        id: userId,
      },
      update: {
        password: hashedPassword,
      },
      create: {
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { message: "Password Updated Successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
