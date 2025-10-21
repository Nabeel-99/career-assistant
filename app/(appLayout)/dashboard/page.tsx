import { auth } from "@/auth";

import NavButton from "@/components/dashboardui/NavButton";
import ChartCard from "@/components/dashboardui/ChartCard";
import SectionCards from "@/components/dashboardui/SectionCards";
import { redirect } from "next/navigation";
import React from "react";
import { FaMicrophone } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { RiFileUploadFill } from "react-icons/ri";
import prisma from "@/lib/prisma";
import OnboardingModal from "@/components/dashboardui/OnboardingModal";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    include: {
      resumes: true,
    },
  });
  if (!user) return null;

  const navbtnItems = [
    {
      title: "Start Interview",
      description: "Practice real-time AI interviews",
      icon: <FaMicrophone className="size-8" />,
      url: "/practice",
    },
    {
      title: "Explore CV Templates",
      description: "Try different resume designs",
      icon: <HiTemplate className="size-8" />,
      url: "/cv-templates",
    },
    {
      title: "Upload Your CV",
      description: "Personalize your practice",
      icon: <RiFileUploadFill className="size-8" />,
      url: "/upload-cv",
    },
  ];

  return (
    <div className="flex flex-col gap-10 2xl:container 2xl:mx-auto">
      <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-10">
        {navbtnItems.map((item) => (
          <NavButton
            key={item.title}
            url={item.url}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      <div className="flex flex-col xl:flex-row gap-10">
        <div className="w-full xl:w-[1200px]">
          <ChartCard userId={session?.user?.id!} />
        </div>

        <div className="flex flex-col gap-4 w-full xl:w-2/4">
          <SectionCards />
        </div>
      </div>
      {user && user.isUserNew && <OnboardingModal />}
    </div>
  );
};

export default page;
