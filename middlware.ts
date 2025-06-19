import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
};

export const config = ["/dashboard/:path*"];
