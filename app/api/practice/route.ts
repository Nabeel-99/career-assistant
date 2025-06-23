import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { jobDescription, experienceLevel, resume } = await req.json();
  } catch (error) {}
};
