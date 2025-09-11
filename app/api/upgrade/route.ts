import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
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
    const { tx_ref, transaction_id } = await req.json();
    const res = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );
    if (res.data.status !== "success" && res.data.data.tx_ref !== tx_ref) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await prisma.user.update({
      where: {
        id: token.id,
      },
      data: {
        type: "PREMIUM",
      },
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
};
