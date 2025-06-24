import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaLightbulb } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
const SectionCards = () => {
  return (
    <>
      <Card className="@container/card w-full">
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2">
            <div className="flex items-center justify-center p-2 border border-[#343333] bg-[#1f1f1f] rounded-lg">
              <FaLightbulb className="size-8" />
            </div>
            <p className="text-xl">AI Tips to improve</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Use a clear and concise resume that highlights your skills and
            experience.
          </p>
        </CardContent>
      </Card>
      <Card className="@container/card w-full">
        <CardHeader className="">
          <CardTitle className="">
            <p className="text-xl">Recent Activity</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center p-2 border border-[#343333] bg-[#1f1f1f] rounded-lg">
              <IoDocumentText className="size-8" />
            </div>
            <div className="flex flex-col">
              <span>resume.pdf</span>
              <span className="text-subheadline">updated 2 days ago </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SectionCards;
