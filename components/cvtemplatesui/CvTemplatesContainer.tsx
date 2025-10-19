"use client";

import React, { useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import PreviewCard from "./PreviewCard";
import { Template } from "@/lib/types";
import TemplateCard from "./TemplateCard";

const CvTemplatesContainer = ({
  templates,
  userId,
}: {
  templates: Template[];
  userId: string | null;
}) => {
  const [openDialogIndex, setOpenDialogIndex] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(290px,1fr))]">
        {templates.map((template, index) => (
          <Dialog
            key={index}
            open={openDialogIndex === index}
            onOpenChange={(open) => setOpenDialogIndex(open ? index : null)}
          >
            <DialogTrigger asChild>
              <div className="w-full  rounded cursor-pointer text-left">
                <TemplateCard template={template} />
              </div>
            </DialogTrigger>
            <DialogContent className="overflow-scroll hide-scrollbar h-3/4 md:h-[700px] md:w-3/4 xl:w-3/4">
              <PreviewCard
                userId={userId!}
                template={template}
                closeParentDialog={() => setOpenDialogIndex(null)}
                isOpen={openDialogIndex === index}
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default CvTemplatesContainer;
