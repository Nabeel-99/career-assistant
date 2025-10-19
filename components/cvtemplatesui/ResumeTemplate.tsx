"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
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
  const [showDelete, setShowDelete] = useState(false);
  const [selectedResume, setSelectedResume] = useState<number | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `Resume-${Date.now()}`,
    pageStyle: `@media print { @page { size: A4; margin: 5mm } }`,
    onAfterPrint() {
      toast("Print dialog closed", {
        description: "If saved, check your downloads.",
      });
    },
    preserveAfterPrint: true,
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                if (isSmallScreen) {
                  toast.info(
                    "Resume preview and download works best on a desktop. Try switching to a bigger screen."
                  );
                  return;
                }
                reactToPrintFn?.();
              }}
              className="cursor-pointer "
            >
              <FaDownload />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Export as PDF</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={() => showDeleteDialog(templateId)}>
              <FaTrash />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
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
