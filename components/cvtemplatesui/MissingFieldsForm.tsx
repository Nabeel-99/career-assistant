"use client";

import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "../ui/input";
import { resumeSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ResumeSchema = z.infer<typeof resumeSchema>;
const socialLinks = ["github", "linkedin", "portfolio"] as const;
type MissingLinksFormType = {
  github: string;
  linkedin: string;
  portfolio: string;
  projectLinks: string[];
};

type MissingFieldsFormProps = {
  missingFields: string[];
  incompleteResume: ResumeSchema | null;
  selectedResume: string | null;
  templateName: string;
  setOpenPreviewCard: (openPreviewCard: boolean) => void;
  setShowMissingLinksModal: (showMissingLinksModal: boolean) => void;
  setResumeModal: (resumeModal: boolean) => void;
};
const MissingFieldsForm = ({
  missingFields,
  incompleteResume,
  selectedResume,
  templateName,
  setOpenPreviewCard,
  setShowMissingLinksModal,
  setResumeModal,
}: MissingFieldsFormProps) => {
  const missingProjectLinks =
    incompleteResume?.projects?.filter((project) => !project.link) || [];
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<MissingLinksFormType>({
    // resolver: zodResolver(MissingLinksSchema),
    defaultValues: {
      github: "",
      linkedin: "",
      portfolio: "",
      projectLinks: missingProjectLinks.map(() => ""),
    },
  });

  const onSubmit = async (data: MissingLinksFormType) => {
    let projectIndex = 0;
    const updatedProjects = incompleteResume?.projects?.map((project) => {
      if (!project.link) {
        const newLink = data.projectLinks[projectIndex];
        projectIndex++;
        return {
          ...project,
          link: newLink,
        };
      }
      return project;
    });
    try {
      setLoading(true);
      const res = await axios.patch("/api/generate-cv", {
        resumeId: selectedResume,
        content: {
          ...incompleteResume,
          links: {
            github: data.github,
            linkedin: data.linkedin,
            portfolio: data.portfolio,
          },
          projects: updatedProjects,
        },
        templateName: templateName,
      });
      console.log("res", res);
      if (res.status === 200) {
        toast.success("Resume generated successfully");
        setOpenPreviewCard(true);
        setShowMissingLinksModal(false);
        setResumeModal(false);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {socialLinks.map(
          (field) =>
            missingFields.includes(field) && (
              <FormField
                key={field}
                control={form.control}
                name={field}
                render={({ field: inputField }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="capitalize">{field}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={`Enter your ${field} URL`}
                        {...inputField}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )
        )}
        {missingFields.includes("project_links") &&
          missingProjectLinks.map((project, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`projectLinks.${index}`}
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>{project.title}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={`Enter the project link for ${project.title}`}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          ))}
        <div className="mt-6 flex justify-end">
          <Button disabled={loading}>
            {loading ? (
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
  );
};

export default MissingFieldsForm;
