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

const PracticeForm = ({ resumes }: { resumes: Resume[] }) => {
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
    try {
      const res = await axios.post("/api/practice", {
        jobDescription: data.jobDescription,
        experienceLevel: data.experienceLevel,
        resume: data.resume,
      });
      console.log(res);
    } catch (error) {}
  };
  console.log("resumes", resumes);
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-col gap-10 w-full px-4">
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
            <div className="w- h-full  max-h-full flex flex-col gap-3">
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
                        {resumes.map((resume) => (
                          <FormItem
                            className="flex items-center justify-between border py-2  px-2 w-full bg-[#1f1f1f]  rounded-sm"
                            key={resume.id}
                          >
                            <FormControl>
                              <div className="flex items-center  gap-3 w-full ">
                                <RadioGroupItem
                                  value={`${resume.name}`}
                                  className=""
                                />
                                <FormLabel className="w-full">
                                  {resume.name}
                                </FormLabel>
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-500" />
                            <Button
                              type="button"
                              onClick={() => openPreview(resume.filePath!)}
                              className="hover:bg-[#151515] bg-[#343333] cursor-pointer rounded-xl text-white"
                            >
                              <FaEye />
                            </Button>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
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
                          <FormItem
                            className="flex items-center gap-3 border py-2 px-1 w-full bg-[#151515] rounded-sm"
                            key={level.value}
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={level.value}
                                className=""
                              />
                            </FormControl>
                            <FormLabel className="w-full">
                              {level.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>
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
