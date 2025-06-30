import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

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
    const { currentPassword, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        id: token.id,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (!user.password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: {
          id: token.id,
        },
        data: {
          password: hashedPassword,
        },
      });
      return NextResponse.json(
        { message: "Password updated successfully" },
        { status: 200 }
      );
    } else {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { message: "Current password is incorrect" },
          { status: 403 }
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: {
          id: token.id,
        },
        data: {
          password: hashedPassword,
        },
      });
      return NextResponse.json(
        { message: "Password updated successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
