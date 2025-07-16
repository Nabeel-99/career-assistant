"use client";

import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { z } from "zod";
import TemplateOne from "../cvtemplates/TemplateOne";
import TemplateTwo from "../cvtemplates/TemplateTwo";
import { Button } from "../ui/button";
import { FaDownload, FaTrash } from "react-icons/fa";
import { resumeSchema } from "@/lib/validation";
import { DeleteDialog } from "../practiceui/DeleteDialog";
import TemplateThree from "../cvtemplates/TemplateThree";
type Content = z.infer<typeof resumeSchema>;
type ResumeTemplateProps = {
  templateId: number;
  deleteLoading: boolean;
  templateName: string;
  content: Content;
  resumeId: string;
  deleteResume: (id: number) => void;
};
const ResumeTemplate = ({
  deleteLoading,
  templateName,
  content,
  resumeId,
  templateId,
  deleteResume,
}: ResumeTemplateProps) => {
  console.log("template", templateName);
  console.log("content", content);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedResume, setSelectedResume] = useState<number | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `Resume-${Date.now()}`,
    pageStyle: `@media print { @page { size: A4; margin: 5mm } }`,
    onAfterPrint() {
      toast("Print dialog closed", {
        description: "If saved, check your downloads.",
      });
    },
  });
  const showDeleteDialog = (resumeId: number) => {
    setShowDelete(true);

    setSelectedResume(resumeId);
  };

  const renderCVTemplate = (
    templateName: string,
    content: Content,
    resumeId?: string
  ) => {
    switch (templateName) {
      case "Template One":
        return <TemplateOne content={content} resumeId={resumeId} />;
      case "Template Two":
        return <TemplateTwo content={content} resumeId={resumeId} />;
      case "Template Three":
        return <TemplateThree content={content} resumeId={resumeId} />;
      default:
        return <div>Template not found</div>;
    }
  };
  return (
    <div className="flex flex-col gap-2">
      {/* printable resume */}
      <div className="sr-only print:block">
        <div ref={contentRef}>
          {renderCVTemplate(templateName, content, resumeId)}
        </div>
      </div>

      {/* preview resume */}
      <div className="border bg-white rounded max-h-[400px] overflow-hidden shadow">
        <div
          className="origin-top-left w-full  scale-[0.4] "
          style={{
            width: "794px",
            height: "1123px",
          }}
        >
          {renderCVTemplate(templateName, content, resumeId)}
        </div>
      </div>
      <div className="flex items-center gap-2 justify-end">
        <Button onClick={reactToPrintFn} className="cursor-pointer ">
          <FaDownload />
        </Button>
        <Button onClick={() => showDeleteDialog(templateId)}>
          <FaTrash />
        </Button>
      </div>
      <DeleteDialog
        deleteLoading={deleteLoading}
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        action={() => deleteResume(selectedResume!)}
      />
    </div>
  );
};

export default ResumeTemplate;
