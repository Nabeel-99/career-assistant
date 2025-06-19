import { auth } from "@/auth";
import ChartCard from "@/components/ChartCard";
import NavButton from "@/components/NavButton";
import SectionCards from "@/components/SectionCards";
import { redirect } from "next/navigation";
import React from "react";
import { AiFillMessage } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");
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
      title: "View Feedback",
      description: "See insights and improve your CV",
      icon: <AiFillMessage className="size-8" />,
      url: "/feedback",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
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
          <ChartCard />
        </div>

        <div className="flex flex-col gap-4 w-full xl:w-2/4">
          <SectionCards />
        </div>
      </div>
    </div>
  );
};

export default page;
