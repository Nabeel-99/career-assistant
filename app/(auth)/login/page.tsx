import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col relative bg-gradient-to-tr from-[#0a0a0a] from-70% to-transparent   items-center justify-center w-full h-screen">
      <div className="absolute w-full  h-full bg-hero"></div>
      <Link
        href={"/"}
        className="fixed z-50 top-10 left-4 lg:left-10 bg-white rounded-md px-4 py-1 text-black cursor-pointer hover:bg-zinc-200 duration-300 transition-all"
      >
        Back to Home
      </Link>
      <LoginForm />
    </div>
  );
};

export default page;
