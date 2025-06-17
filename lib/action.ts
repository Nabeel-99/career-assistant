"use server";
import bcrypt from "bcrypt";
import prisma from "./prisma";
import { signIn } from "@/auth";
export const signup = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}) => {
  console.log("data");
  const { firstname, lastname, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      isUserNew: false,
    },
  });
  return user;
};

export const signInWithGoogle = async () => {
  await signIn("google");
};

export const signInWithGithub = async () => {
  await signIn("github");
};
