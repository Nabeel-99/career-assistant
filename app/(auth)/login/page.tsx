import LoginForm from "@/components/forms/LoginForm";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col relative  items-center justify-center w-full h-screen">
      <div className="absolute  top-0 h-full bg-hero"></div>
      <LoginForm />
    </div>
  );
};

export default page;
