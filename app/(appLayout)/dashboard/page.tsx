"use client";

import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const logout = async () => {
    await signOut({ redirectTo: "/" });
  };
  return <div className=""></div>;
};

export default page;
