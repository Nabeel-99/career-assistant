"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { ImSpinner9 } from "react-icons/im";
import { MdOutlineFileUpload } from "react-icons/md";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { atsAnalyzerSchema } from "@/lib/validation";
import z from "zod";

type AtsAnalyzerFormProps = {
  form: any;
  loading: boolean;
  uploading: boolean;
  onSubmit: (data: z.infer<typeof atsAnalyzerSchema>) => void;
  filename: string;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const AtsAnalyzerForm = ({
  form,
  loading,
  uploading,
  onSubmit,
  filename,
  handleFileUpload,
}: AtsAnalyzerFormProps) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Job title e.g Software Engineer, UI/UX Designer..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste job description"
                  {...field}
                  className="min-h-60 max-h-60"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resume"
          render={() => (
            <div className="flex items-start gap-2 border p-2 rounded-lg">
              <MdOutlineFileUpload className="size-10 text-subheadline" />
              <div className="flex flex-col gap-1">
                <p className="font-bold">Upload CV </p>
                <span className="text-sm text-subheadline">
                  Supported Format: .pdf (max 10MB)
                </span>
                <Label
                  htmlFor="file"
                  className="bg-black/20 hover:bg-black/30 dark:bg-[#303030] px-4 py-2 rounded-md cursor-pointer dark:hover:bg-[#343333] transition-all duration-300 text-center flex items-center justify-center"
                >
                  Choose File
                </Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  hidden
                  disabled={uploading}
                />
                {filename && (
                  <span className="text-sm text-green-600 dark:text-green-400">
                    ✓ {filename}
                  </span>
                )}
              </div>
            </div>
          )}
        />

        <div className="flex  mt-3 z-50">
          <Button disabled={loading} className="w-full" type="submit">
            {loading ? (
              <div className="flex items-center gap-2">
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

export default AtsAnalyzerForm;
