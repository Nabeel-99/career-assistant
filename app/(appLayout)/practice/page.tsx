import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { FaEye } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const page = async () => {
  const session = await auth();
  const resumes = await prisma.resume.findMany({
    where: {
      userId: session?.user?.id,
    },
  });
  console.log("resumes", resumes);
  return (
    <div className="flex flex-col xl:flex-row gap-10 w-full">
      <div className="flex flex-col gap-3 w-full">
        <Label>Job Description</Label>
        <Textarea
          placeholder="paste job description here"
          className="w-full min-h-[250px] max-h-[250px]"
        />
      </div>
      <div className="w-3/4 h-full  max-h-full flex flex-col gap-3">
        <p>Choose Resume for Interview Practice</p>
        <RadioGroup
          defaultValue=""
          className="flex flex-col gap-4 max-h-[240px] overflow-scroll hide-scrollbar bg-[#151515] border w-full rounded-sm p-2"
        >
          {resumes.map((resume) => (
            <div
              className="flex items-center justify-between border py-2  px-2 w-full bg-[#1f1f1f]  rounded-sm"
              key={resume.id}
            >
              <div className="flex items-center  gap-3 w-full ">
                <RadioGroupItem
                  value={`${resume.name}`}
                  id={`${resume.name}`}
                  className=""
                />
                <Label htmlFor={`${resume.name}`} className="w-full">
                  {resume.name}
                </Label>
              </div>
              <Button className="hover:bg-[#151515] bg-[#343333] cursor-pointer rounded-xl text-white">
                <FaEye />
              </Button>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-3 w-2/4">
        <p className="text-sm">Select Experience Level</p>
        <RadioGroup defaultValue="entry-level" className="flex flex-col gap-4">
          <div className="flex items-center gap-3 border py-2 px-1 w-full bg-[#151515] rounded-sm">
            <RadioGroupItem value="entry-level" id="entry-level" className="" />
            <Label htmlFor="entry-level" className="w-full">
              Entry Level
            </Label>
          </div>
          <div className="flex items-center gap-3 border py-2 px-1 w-full bg-[#151515] rounded-sm">
            <RadioGroupItem value="mid-level" id="mid-level" />
            <Label htmlFor="mid-level">Mid-Level</Label>
          </div>
          <div className="flex items-center gap-3 border py-2 px-1 w-full bg-[#151515] rounded-sm">
            <RadioGroupItem value="senior-level" id="senior-level" />
            <Label htmlFor="senior-level">Senior Level</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default page;
