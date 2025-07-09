"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ImSpinner9 } from "react-icons/im";
import { Skeleton } from "../ui/skeleton";
import { Resume } from "@/lib/generated/prisma";
import { resumeSchema } from "@/lib/validation";
import MissingFieldsForm from "../forms/MissingFieldsForm";

const mockSchema = z.object({
  resumeId: z.string(),
});

type ApplyDialogProps = {
  resumes: Resume[];
  loading: boolean;
  templateName?: string;
  setOpenPreviewCard: (openPreviewCard: boolean) => void;
};

type ResumeSchema = z.infer<typeof resumeSchema>;
const ApplyDialog = ({
  resumes,
  loading,
  templateName,
  setOpenPreviewCard,
}: ApplyDialogProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [showMissingLinksModal, setShowMissingLinksModal] = useState(false);
  const [missingfields, setMissingFields] = useState<string[]>([]);
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [resumeModal, setResumeModal] = useState(false);
  const [incompleteResume, setIncompleteResume] = useState<ResumeSchema | null>(
    null
  );

  const form = useForm<z.infer<typeof mockSchema>>({
    resolver: zodResolver(mockSchema),
    defaultValues: {
      resumeId: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof mockSchema>) => {
    console.log(data.resumeId);
    if (!data.resumeId) {
      toast.error("Resume is empty");
      return;
    }
    setSelectedResume(data.resumeId);
    try {
      setSubmitting(true);
      const res = await axios.post("/api/cv/generate-cv", {
        resumeId: data.resumeId,
      });
      console.log("res", res);
      if (res.status === 200) {
        toast.success("Resume generated successfully");
      }
    } catch (error: any) {
      console.log("error", error);

      if (error.response.status === 422) {
        const missing = [];
        toast.error("Missing links");
        const parsedContent = error.response.data.data;
        if (!parsedContent?.links?.github) missing.push("github");
        if (!parsedContent?.links?.linkedin) missing.push("linkedin");
        if (!parsedContent?.links?.portfolio) missing.push("portfolio");
        if (parsedContent?.projects?.some((project: any) => !project.link)) {
          missing.push("project_links");
        }
        setIncompleteResume(parsedContent);
        setMissingFields(missing);
        setShowMissingLinksModal(true);
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Dialog open={resumeModal} onOpenChange={setResumeModal}>
        <DialogTrigger asChild>
          <Button>Apply Template to My CV</Button>
        </DialogTrigger>
        <DialogContent className="w-full md:w-2/4">
          <DialogHeader>
            <DialogTitle>Select Resume</DialogTitle>
            <DialogDescription>
              Select the resume you want to apply this template to
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="resumeId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        className="flex flex-col gap-4 max-h-[190px]  overflow-scroll hide-scrollbar dark:bg-[#151515] border w-full rounded-sm p-2"
                      >
                        {loading ? (
                          <span className="flex flex-col gap-4">
                            {Array.from({ length: 3 }).map((_, index) => (
                              <Skeleton
                                className="flex items-center justify-between border py-2 px-2 w-full h-10  dark:bg-[#1f1f1f] rounded-sm cursor-pointer"
                                key={index}
                              />
                            ))}
                          </span>
                        ) : resumes.length > 0 ? (
                          resumes.map((resume) => (
                            <label
                              key={resume.id}
                              htmlFor={`${resume.filePath}`}
                              className="flex items-center justify-between border py-2 px-2 w-full dark:bg-[#1f1f1f] rounded-sm cursor-pointer"
                            >
                              <div className="flex items-center gap-3 w-full">
                                <RadioGroupItem
                                  id={`${resume.filePath}`}
                                  value={`${resume.id}`}
                                  className=""
                                />
                                <span className="w-full text-left">
                                  {resume.name}
                                </span>
                              </div>
                              {/* <Button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // openPreview(resume.filePath!);
                                      }}
                                      className="bg-black/10 hover:bg-black/20 text-black dark:bg-[#151515] dark:hover:bg-[#343333] cursor-pointer rounded-xl dark:text-white"
                                    >
                                      <FaEye />
                                    </Button> */}
                            </label>
                          ))
                        ) : (
                          <span className="text-sm text-subheadline text-center py-1">
                            You haven't uploaded a resume yet.
                          </span>
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="flex justify-end mt-3">
                <Button disabled={submitting}>
                  {submitting ? (
                    <span className="animate-spin">
                      <ImSpinner9 />
                    </span>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* missing links form  */}
      <Dialog
        open={showMissingLinksModal}
        onOpenChange={setShowMissingLinksModal}
      >
        <DialogContent className="w-full md:w-2/4">
          <DialogHeader>
            <DialogTitle>Missing links</DialogTitle>
            <DialogDescription>
              You need to add links to your resume
            </DialogDescription>
          </DialogHeader>
          <MissingFieldsForm
            selectedResume={selectedResume}
            missingFields={missingfields}
            incompleteResume={incompleteResume}
            templateName={templateName || ""}
            setOpenPreviewCard={setOpenPreviewCard}
            setShowMissingLinksModal={setShowMissingLinksModal}
            setResumeModal={setResumeModal}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplyDialog;
