"use client";

import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  //   console.log("token", token);
  return (
    <div className="flex flex-col relative bg-gradient-to-tr from-[#0a0a0a] from-70% to-transparent   items-center justify-center w-full h-screen">
      <div className="absolute w-full  h-full bg-hero"></div>
      <ResetPasswordForm token={token!} />
    </div>
  );
};

export default page;
