"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { FaEye } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Resume } from "@/app/generated/prisma";
import supabase from "@/lib/supabase";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

const ResumeRadioGroup = ({ resumes }: { resumes: Resume[] }) => {
  const [preview, setPreview] = useState(false);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const openPreview = async (filePath: string) => {
    if (!filePath) return;
    const { data } = supabase.storage.from("resumes").getPublicUrl(filePath);
    if (data.publicUrl) {
      setPreview(true);
      setPublicUrl(data.publicUrl);
      //   setShowResume(true);
    }
  };
  return (
    <>
      <RadioGroup
        defaultValue={`${resumes[0].name}`}
        className="flex flex-col gap-4 max-h-[190px] overflow-scroll hide-scrollbar bg-[#151515] border w-full rounded-sm p-2"
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
            <Button
              type="button"
              onClick={() => openPreview(resume.filePath!)}
              className="hover:bg-[#151515] bg-[#343333] cursor-pointer rounded-xl text-white"
            >
              <FaEye />
            </Button>
          </div>
        ))}
      </RadioGroup>

      {/* show Resume */}
      <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent className="mx-auto h-[90vh] overflow-scroll ">
          <DialogHeader>
            <DialogTitle>Resume</DialogTitle>
            <DialogDescription className="text-sm text-subheadline">
              resume preview
            </DialogDescription>
          </DialogHeader>
          <iframe src={publicUrl!} className="w-full h-[90vh]"></iframe>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResumeRadioGroup;
