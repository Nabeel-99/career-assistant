import { auth } from "@/auth";
import UploadCard from "@/components/UploadCard";
import { getToken } from "next-auth/jwt";
import React from "react";

const page = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  console.log("session", session);

  return (
    <div className="flex flex-col xl:flex-row gap-10 w-full">
      <UploadCard userId={userId} />
    </div>
  );
};

export default page;
