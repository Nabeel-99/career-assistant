import { auth } from "@/auth";
import UploadCard from "@/components/uploadcvui/UploadCard";
import React from "react";

const page = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <div className="flex flex-col xl:flex-row gap-10 w-full">
      <UploadCard userId={userId} />
    </div>
  );
};

export default page;
