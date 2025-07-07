import { auth } from "@/auth";
import React from "react";
import CvTemplatesContainer from "@/components/cvtemplatesui/CvTemplatesContainer";

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
    // {
    //   image: "/templatetwo.png",
    //   name: "Template Two",
    //   title: "Modern",
    //   description: "A modern classic design template",
    // },
  ];
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-sm">Browse CV Templates</h1>
      <div className="flex justify-start">
        {/* <Button>Generate new CV</Button> */}
      </div>
      {/* cv templates */}
      <CvTemplatesContainer templates={templates} userId={session?.user?.id!} />
      {/* <TemplateOne /> */}
    </div>
  );
};

export default page;
