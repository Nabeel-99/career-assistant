"use client";

import React, { useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { resumeSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import EducationInputs from "./EducationInputs";
import ExperienceInputs from "./ExperienceInputs";
import SocialLinksInputs from "./SocialLinksInputs";
import ProjectInputs from "./ProjectInputs";
import LanguageInputs from "./LanguageInputs";
import AwardsInputs from "./AwardsInputs";
import UserInfoInputs from "./UserInfoInputs";
import axios from "axios";
import supabase from "@/lib/supabase";
import { toast } from "sonner";
import { ImSpinner9 } from "react-icons/im";
import { fetchResumeWithContent } from "@/lib/action";
import { useRouter } from "next/navigation";

const CVForm = ({
  templateName,
  userId,
  setOpenForm,
  setOpenPreviewCard,
}: {
  templateName: string;
  userId: string;
  setOpenForm: (openForm: boolean) => void;
  setOpenPreviewCard: (openPreviewCard: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      image: "",
      fullname: "",
      email: "",
      phone: "",
      location: "",
      title: "",
      summary: "",
      links: {
        linkedin: "",
        github: "",
        portfolio: "",
      },
      education: [
        {
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
          location: "",
        },
      ],
      experience: [
        {
          company: "",
          title: "",
          startDate: "",
          endDate: "",
          location: "",
          description: "",
          currentlyWorking: false,
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          stacks: "",
          link: "",
        },
      ],
      skills: "",
      languages: [
        {
          name: "",
          level: "beginner",
        },
      ],
      awards: [
        {
          title: "",
          description: "",
          year: "",
        },
      ],
    },
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: "experience",
  });
  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control: form.control,
    name: "projects",
  });
  const {
    fields: languagesFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control: form.control,
    name: "languages",
  });
  const {
    fields: awardsFields,
    append: appendAward,
    remove: removeAward,
  } = useFieldArray({
    control: form.control,
    name: "awards",
  });
  const onSubmit = async (data: z.infer<typeof resumeSchema>) => {
    try {
      setLoading(true);

      if (data.awards && Array.isArray(data.awards)) {
        data.awards = data.awards.filter(
          (award) =>
            award &&
            (award.title?.trim() ||
              award.description?.trim() ||
              award.year?.trim())
        );
      }
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image") return;
        formData.append(key, JSON.stringify(value));
      });
      if (data.image instanceof File) {
        formData.append("image", croppedFile!);
      }

      formData.append("templateName", JSON.stringify(templateName));
      const res = await axios.post("/api/cv/create-cv", formData);
      if (res.status === 200) {
        toast.success("Resume created successfully");
        setOpenForm(false);
        setOpenPreviewCard(false);
        if (userId) {
          await fetchResumeWithContent(userId);
        }
        router.refresh();
      }
    } catch (error) {
      toast.error("Error creating resume");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <UserInfoInputs setCroppedFile={setCroppedFile} form={form} />
        <FormLabel className="">Links</FormLabel>
        <SocialLinksInputs form={form} />
        <FormLabel>Education</FormLabel>
        <EducationInputs
          educationFields={educationFields}
          form={form}
          removeEducation={removeEducation}
          appendEducation={appendEducation}
        />
        <FormLabel>Experience</FormLabel>
        <ExperienceInputs
          experienceFields={experienceFields}
          form={form}
          removeExperience={removeExperience}
          appendExperience={appendExperience}
        />

        <FormLabel>Projects</FormLabel>
        <ProjectInputs
          projectFields={projectFields}
          form={form}
          removeProject={removeProject}
          appendProject={appendProject}
        />
        <FormLabel>Skills</FormLabel>
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Enter one skill separated by comma e.g React, NextJS"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Languages</FormLabel>
        <LanguageInputs
          languagesFields={languagesFields}
          form={form}
          removeLanguage={removeLanguage}
          appendLanguage={appendLanguage}
        />

        <FormLabel>Awards</FormLabel>
        <AwardsInputs
          awardsFields={awardsFields}
          form={form}
          removeAward={removeAward}
          appendAward={appendAward}
        />

        <div className="flex justify-end mt-3 z-50">
          <Button disabled={loading} type="submit">
            {loading ? (
              <div className="flex items-center gap-2">
                <span>Creating cv</span>
                <span className="animate-spin">
                  <ImSpinner9 />
                </span>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CVForm;
