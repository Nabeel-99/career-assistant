import { auth } from "@/auth";
import React from "react";
import CvTemplatesContainer from "@/components/cvtemplatesui/CvTemplatesContainer";
import UserCVTemplates from "@/components/cvtemplatesui/UserCVTemplates";

const page = async () => {
  const session = await auth();
  const templates = [
    {
      image: "/templateone.png",
      name: "Template One",
      title: "Plain Classic",
      description:
        " A clean, no-frills single-column resume template that keeps the focus on your content. Perfect for professionals who value simplicity and clarity.",
    },
    {
      image: "/templatetwo.png",
      name: "Template Two",
      title: "Modern Two-Column Resume",
      description:
        "A clean and modern resume template with a two-column layout, perfect for showcasing skills and experience side by side.",
    },
  ];
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

      {/* <TemplateOne /> */}
    </div>
  );
};

export default page;
