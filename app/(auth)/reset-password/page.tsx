"use client";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const TokenWrapper = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return <ResetPasswordForm token={token!} />;
};

const Page = () => {
  return (
    <div className="flex flex-col relative bg-gradient-to-tr from-[#0a0a0a] from-70% to-transparent items-center justify-center w-full h-screen">
      <div className="absolute w-full h-full bg-hero"></div>
      <Suspense fallback={<div>Loading...</div>}>
        <TokenWrapper />
      </Suspense>
    </div>
  );
};

export default Page;
