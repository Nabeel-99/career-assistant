"use server";

import bcrypt from "bcrypt";
import prisma from "./prisma";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
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

export const signOutAction = async () => {
  await signOut();
  redirect("/");
};

export const fetchResumes = async (userId: string) => {
  const resumes = await prisma.resume.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return resumes;
};

export const fetchPractices = async (userId: string) => {
  const practices = await prisma.practice.findMany({
    where: {
      userId,
    },
    include: {
      questions: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return practices;
};

export const fetchPracticeById = async (id: string) => {
  const practice = await prisma.practice.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      questions: true,
    },
  });
  if (!practice) {
    throw new Error("Practice not found");
  }
  return practice;
};
