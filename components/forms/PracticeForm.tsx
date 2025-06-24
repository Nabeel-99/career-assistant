"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Resume } from "@/app/generated/prisma";
import axios from "axios";
import { useForm } from "react-hook-form";
import { PracticeSchema } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { FaEye } from "react-icons/fa";
import supabase from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ImSpinner9 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

const PracticeForm = ({
  resumes,
  closeSheet,
  fetchingResumes,
  userId,
  getUserPractices,
}: {
  resumes: Resume[];
  closeSheet: () => void;
  fetchingResumes: boolean;
  userId: string;
  getUserPractices: () => void;
}) => {
  console.log("userId", userId);
  const form = useForm<z.infer<typeof PracticeSchema>>({
    resolver: zodResolver(PracticeSchema),
    defaultValues: {
      jobDescription: "",
      experienceLevel: "entry-level",
      resume: "",
    },
  });
  const experienceLevels = [
    {
      value: "entry-level",
      label: "Entry Level",
    },
    {
      value: "mid-level",
      label: "Mid Level",
    },
    {
      value: "senior-level",
      label: "Senior Level",
    },
  ];
  const [preview, setPreview] = useState(false);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const openPreview = async (filePath: string) => {
    if (!filePath) return;
    const { data } = supabase.storage.from("resumes").getPublicUrl(filePath);
    if (data.publicUrl) {
      setPreview(true);
      setPublicUrl(data.publicUrl);
      //   setShowResume(true);
    }
  };

  const onSubmit = async (data: z.infer<typeof PracticeSchema>) => {
    console.log("data", data);
    setLoading(true);
    try {
      const res = await axios.post("/api/practice/create", {
        jobDescription: data.jobDescription,
        experienceLevel: data.experienceLevel,
        resume: data.resume,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success("Interview practice created successfully");
        closeSheet();
        getUserPractices();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating interview practice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10 px-4"
        >
          <div className="flex flex-col gap-10 w-full ">
            <div className="flex flex-col gap-3 w-full">
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="paste job description"
                        className="w-full min-h-[200px] max-h-[200px]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full h-full  max-h-full flex flex-col gap-3">
              <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose Resume for Interview Practice</FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        className="flex flex-col gap-4 max-h-[190px] overflow-scroll hide-scrollbar bg-[#151515] border w-full rounded-sm p-2"
                      >
                        {fetchingResumes ? (
                          <span className="flex flex-col gap-4">
                            {Array.from({ length: 3 }).map((_, index) => (
                              <Skeleton
                                className="flex items-center justify-between border py-2 px-2 w-full h-10  bg-[#1f1f1f] rounded-sm cursor-pointer"
                                key={index}
                              />
                            ))}
                          </span>
                        ) : (
                          resumes.map((resume) => (
                            <label
                              key={resume.id}
                              htmlFor={`${resume.filePath}`}
                              className="flex items-center justify-between border py-2 px-2 w-full bg-[#1f1f1f] rounded-sm cursor-pointer"
                            >
                              <div className="flex items-center gap-3 w-full">
                                <RadioGroupItem
                                  id={`${resume.filePath}`}
                                  value={`${resume.rawText}`}
                                  className=""
                                />
                                <span className="w-full text-left">
                                  {resume.name}
                                </span>
                              </div>
                              <Button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openPreview(resume.filePath!);
                                }}
                                className="hover:bg-[#151515] bg-[#343333] cursor-pointer rounded-xl text-white"
                              >
                                <FaEye />
                              </Button>
                            </label>
                          ))
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">
                      {" "}
                      Select Experience Level
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        className="flex flex-col gap-4 w-full"
                      >
                        {experienceLevels.map((level) => (
                          <label
                            className="flex items-center gap-3 border py-2 px-1 w-full bg-[#151515] rounded-sm"
                            key={level.value}
                          >
                            <div>
                              <RadioGroupItem
                                value={level.value}
                                className=""
                              />
                            </div>
                            <span className="w-full">{level.label}</span>
                          </label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="px-4" disabled={loading}>
            {loading ? (
              <ImSpinner9 className="animate-spin" />
            ) : (
              "Generate Interview"
            )}
          </Button>
        </form>
      </Form>
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

export default PracticeForm;
