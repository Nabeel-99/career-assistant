"use client";

import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

const page = () => {
  return (
    <div className="flex flex-col relative bg-gradient-to-tr from-[#0a0a0a] from-70% to-transparent   items-center justify-center w-full h-screen">
      <div className="absolute w-full  h-full bg-hero"></div>
      <ForgotPasswordForm />
    </div>
  );
};

export default page;
