import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { generateResetPasswordEmail } from "@/lib/helper";
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});
export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const token = jwt.sign({ user: user.id }, process.env.AUTH_SECRET!, {
      expiresIn: "1h",
    });
    const name = user.firstname;
    const isProduction = process.env.NODE_ENV === "production";
    const APPURL = isProduction
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "http://localhost:3000";
    const resetLink = `${APPURL}/reset-password?token=${token}`;
    const html = generateResetPasswordEmail(name!, resetLink);
    const mailResponse = await transport.sendMail({
      from: `"Career Assistant" <${process.env.GMAIL}>`,
      to: user.email!,
      subject: "Reset Your password",
      html: html,
      text: `Hi ${name},\n\nClick the link to reset your password:\n${resetLink}\n\nIf you didn't request this, ignore it.`,
    });

    if (mailResponse.accepted.includes(user.email!)) {
      return NextResponse.json({ message: "Email Sent" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Email Failed to send" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("eror", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
