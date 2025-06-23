import React from "react";
import ResumeRadioGroup from "../ResumeRadioGroup";

import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Resume } from "@/app/generated/prisma";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const PracticeForm = ({ resumes }: { resumes: Resume[] }) => {
  return (
    <form className="flex flex-col gap-10">
      <div className="flex flex-col gap-10 w-full px-4">
        <div className="flex flex-col gap-3 w-full">
          <Label>Job Description</Label>
          <Textarea
            placeholder="paste job description"
            className="w-full min-h-[200px] max-h-[200px]"
          />
        </div>
        <div className="w- h-full  max-h-full flex flex-col gap-3">
          <p>Choose Resume for Interview Practice</p>
          <ResumeRadioGroup resumes={resumes ?? []} />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-sm">Select Experience Level</p>
          <RadioGroup
            defaultValue="entry-level"
            className="flex flex-col gap-4 w-full"
          >
            <div className="flex items-center gap-3 border py-2 px-1 w-full bg-[#151515] rounded-sm">
              <RadioGroupItem
                value="entry-level"
                id="entry-level"
                className=""
              />
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
    </form>
  );
};

export default PracticeForm;
