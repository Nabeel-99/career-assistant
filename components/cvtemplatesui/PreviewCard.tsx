"use client";

import React, { useEffect, useState } from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { fetchResumes } from "@/lib/action";
import { Resume } from "@/lib/generated/prisma";
import ApplyDialog from "./ApplyDialog";
import { Template } from "@/lib/types";
import CreateCVDialog from "./CreateCVDialog";
import { toast } from "sonner";

const PreviewCard = ({
  userId,
  template,
  setOpenPreviewCard,
}: {
  userId: string | null;
  template: Template;
  setOpenPreviewCard: (openPreviewCard: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const getUserResumes = async () => {
    try {
      setLoading(true);
      const res = await fetchResumes(userId!);

      if (res) {
        setResumes(res);
      }
    } catch (error) {
      toast.error("Error fetching resumes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserResumes();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5 lg:flex-row w-full">
        <div className="w-full border max-xl:mt-4  overflow-y-auto max-h-[650px] rounded bg-white p-2 hide-scrollbar">
          <img src={template.image} alt="template-one" className=" w-full " />
        </div>
        <div className="flex flex-col gap-2">
          <DialogHeader>
            <DialogTitle> {template.title}</DialogTitle>
            <DialogDescription>{template.description}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-6 items-center justify-center mt-10">
            <ApplyDialog
              userId={userId}
              resumes={resumes}
              loading={loading}
              templateName={template.name}
              setOpenPreviewCard={setOpenPreviewCard}
            />
            <CreateCVDialog userId={userId!} templateName={template.name} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewCard;
