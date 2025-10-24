"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "../ui/input";
import { resumeSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "sonner";

import supabase from "@/lib/supabase";
import CropImage from "./CropImage";

type ResumeSchema = z.infer<typeof resumeSchema>;
const socialLinks = ["github", "linkedin", "portfolio"] as const;
type MissingLinksFormType = {
  image?: any;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  projectLinks: string[];
};

type MissingFieldsFormProps = {
  userId: string;
  missingFields: string[];
  incompleteResume: ResumeSchema | null;
  selectedResume: string | null;
  templateName: string;
  closeParentDialog: () => void;
  setShowMissingLinksModal: (showMissingLinksModal: boolean) => void;
  setResumeModal: (resumeModal: boolean) => void;
  refetchResumes: () => Promise<void>;
};
const MissingFieldsForm = ({
  userId,
  missingFields,
  incompleteResume,
  selectedResume,
  templateName,
  closeParentDialog,
  setShowMissingLinksModal,
  setResumeModal,
  refetchResumes,
}: MissingFieldsFormProps) => {
  const missingProjectLinks =
    incompleteResume?.projects?.filter((project) => !project?.link) || [];
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const form = useForm<MissingLinksFormType>({
    // resolver: zodResolver(MissingLinksSchema),
    defaultValues: {
      image: "",
      github: "",
      linkedin: "",
      portfolio: "",
      projectLinks: missingProjectLinks.map(() => ""),
    },
  });

  console.log("template ame", templateName);

  const onSubmit = async (data: MissingLinksFormType) => {
    let projectIndex = 0;
    const updatedProjects = incompleteResume?.projects?.map((project) => {
      if (!project?.link) {
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
      const formData = new FormData();

      if (croppedFile) {
        formData.append("image", croppedFile);
      }
      formData.append("resumeId", JSON.stringify(selectedResume!));
      formData.append("templateName", JSON.stringify(templateName));
      formData.append(
        "content",
        JSON.stringify({
          ...incompleteResume,
          links: {
            github: data.github,
            linkedin: data.linkedin,
            portfolio: data.portfolio,
          },
          projects: updatedProjects,
        })
      );

      setLoading(true);
      const res = await axios.post("/api/cv/generate-cv", formData);

      if (res.status === 200) {
        toast.success("Resume generated successfully");
        await refetchResumes();
        setShowMissingLinksModal(false);
        setResumeModal(false);
        closeParentDialog();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error generating resume");
    } finally {
      setLoading(false);
    }
  };

  const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Please upload a valid image format (JPEG, JPG, PNG, WebP)");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image size must be less than 5MB");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setShowCropModal(true);
    };
    reader.readAsDataURL(file);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {missingFields.includes("image") &&
          templateName === "Template Three" && (
            <div className="flex  gap-10 items-center">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageChange(e);
                          const file = e.target.files?.[0];
                          if (file) {
                            const previewUrl = URL.createObjectURL(file);
                            setPreview(previewUrl);
                            form.setValue("image", file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              {/* preview image */}
              {preview && (
                <>
                  <div className="flex flex-col gap-2">
                    <div className="max-w-40  border rounded overflow-hidden">
                      <img
                        src={preview!}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="">
                      <Button
                        type="button"
                        onClick={() => setShowCropModal(true)}
                      >
                        Resize
                      </Button>
                    </div>
                  </div>

                  <CropImage
                    form={form}
                    setPreview={setPreview}
                    setCroppedFile={setCroppedFile}
                    image={selectedImage!}
                    open={showCropModal}
                    closeModal={() => setShowCropModal(false)}
                  />
                </>
              )}
            </div>
          )}
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
                  <FormLabel>{project?.title}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={`Enter the project link for ${project?.title}`}
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
