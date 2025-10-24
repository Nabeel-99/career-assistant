import { auth } from "@/auth";
import React from "react";
import CvTemplatesContainer from "@/components/cvtemplatesui/CvTemplatesContainer";
import UserCVTemplates from "@/components/cvtemplatesui/UserCVTemplates";
import { templates } from "@/lib/utils";

const page = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-sm">My CV Templates</h1>
      <UserCVTemplates userId={session?.user?.id!} />
      {/* cv templates */}
      <div className="flex flex-col gap-1 mt-4">
        <h1 className="text-sm">Browse CV Templates</h1>
        <CvTemplatesContainer
          templates={templates}
          userId={session?.user?.id!}
        />
      </div>
    </div>
  );
};

export default page;
