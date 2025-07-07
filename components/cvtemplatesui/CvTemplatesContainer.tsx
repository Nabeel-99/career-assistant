"use client";

import React, { useState } from "react";
import TemplateCard from "../cvtemplates/TemplateCard";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import PreviewCard from "./PreviewCard";
import { Template } from "@/lib/types";

const CvTemplatesContainer = ({
  templates,
  userId,
}: {
  templates: Template[];
  userId: string | null;
}) => {
  const [openPreviewCard, setOpenPreviewCard] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(290px,1fr))]">
        {templates.map((template, item) => (
          <Dialog
            key={item}
            open={openPreviewCard}
            onOpenChange={setOpenPreviewCard}
          >
            <DialogTrigger asChild>
              <div className="w-full cursor-pointer text-left">
                <TemplateCard {...template} />
              </div>
            </DialogTrigger>
            <DialogContent className="overflow-scroll hide-scrollbar h-3/4 md:h-[700px] md:w-3/4 xl:w-3/4">
              <PreviewCard
                userId={userId!}
                template={template}
                setOpenPreviewCard={setOpenPreviewCard}
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default CvTemplatesContainer;
