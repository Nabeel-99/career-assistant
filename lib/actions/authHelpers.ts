"use server";

import bcrypt from "bcrypt";

import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "../prisma";

export const signInWithGoogle = async () => {
  await signIn("google");
};

export const signInWithGithub = async () => {
  await signIn("github");
};

export const signOutAction = async () => {
  await signOut({ redirect: false });
  redirect("/");
};

export const signup = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}) => {
  const { firstname, lastname, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        // isUserNew: false,
      },
    });
    return user;
  } catch (error: any) {
    if (
      error?.code === "P2002"
      // error?.message?.includes("Unique constraint failed")
    ) {
      const err = new Error("EMAIL_EXISTS");
      throw err;
    }
    throw error;
  }
};
