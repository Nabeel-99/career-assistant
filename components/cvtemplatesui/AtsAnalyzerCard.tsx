"use client";

import React, { ChangeEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { atsAnalyzerSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Resume } from "@/lib/generated/prisma";
import axios from "axios";
import { PiReadCvLogo } from "react-icons/pi";
import { convertPdfToImage } from "@/lib/pdf2img";
import { FaXmark } from "react-icons/fa6";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ATSFeedback } from "@/lib/types";
import AtsAnalyzerForm from "../forms/AtsAnalyzerForm";
import AtsFeedback from "./AtsFeedback";

const AtsAnalyzerCard = ({ userId }: { userId: string }) => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [fetchingResumes, setFetchingResumes] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<ATSFeedback | null>(null);
  const [showXButton, setShowXButton] = useState(false);
  const form = useForm<z.infer<typeof atsAnalyzerSchema>>({
    resolver: zodResolver(atsAnalyzerSchema),
    defaultValues: {
      jobTitle: "",
      jobDescription: "",
      resume: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof atsAnalyzerSchema>) => {
    try {
      setLoading(true);
      setShowXButton(false);
      const formData = new FormData();
      formData.append("jobTitle", data.jobTitle);
      formData.append("jobDescription", data.jobDescription);
      formData.append("resume", uploadedFile!);
      const res = await axios.post("/api/cv/ats-analyzer", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        console.log("res", res.data);
        setShowResult(true);
        setResult(res.data.atsFeedback);
        form.reset();
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const uploadFile = async (file: File) => {
    if (!file) return;
    setFilename(file.name);
    try {
      setUploading(true);
      setUploadedFile(file);
      const result = await convertPdfToImage(file);
      if (result.imageUrl) {
        setPreview(result.imageUrl);
        setShowXButton(true);
      }
    } catch (error) {
      toast.error("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.includes("pdf")) {
        toast.error("Please upload a PDF file");
        return;
      }

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("File size must be less than 10MB");
        return;
      }
      await uploadFile(file);
    }
  };

  // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsDragging(true);
  // };

  // const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsDragging(false);
  // };

  // const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsDragging(false);

  //   const droppedFile = e.dataTransfer.files[0];
  //   if (droppedFile) {
  //     if (!droppedFile.type.includes("pdf")) {
  //       toast.error("Please upload a PDF file");
  //       return;
  //     }
  //     const maxSize = 10 * 1024 * 1024;
  //     if (droppedFile.size > maxSize) {
  //       toast.error("File size must be less than 10MB");
  //       return;
  //     }
  //     await uploadFile(droppedFile);
  //   }
  // };
  // const getUserResumes = async () => {
  //   try {
  //     setFetchingResumes(true);
  //     const res = await fetchResumes(userId);
  //     setResumes(res);
  //   } catch (error) {
  //     toast.error("Error fetching resumes");
  //   } finally {
  //     setFetchingResumes(false);
  //   }
  // };
  // useEffect(() => {
  //   getUserResumes();
  // }, [userId]);

  // const openPreview = async (publicUrl: string) => {
  //   if (publicUrl) {
  //     setPreview(true);
  //     setPublicUrl(publicUrl);
  //     //   setShowResume(true);
  //   }
  // };

  return (
    <div className=" w-full">
      <Card className="">
        <CardHeader>
          <CardTitle>ATS analyzer</CardTitle>
          <CardDescription>
            Check how well your CV matches a job description before applying.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <div className="grid lg:grid-cols-2 gap-10">
            <Card className="flex flex-col gap-2   relative  max-h-[600px] items-center justify-center">
              {preview ? (
                <div className="overflow-y-auto hide-scrollbar  max-h-[600px]">
                  {showXButton && (
                    <div className="absolute top-2 right-5 z-30">
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null), setFilename("");
                        }}
                        className="border bg-red-500 text-white p-1 rounded-full cursor-pointer hover:bg-red-500/90  transition-all duration-300 ease-in-out"
                      >
                        {" "}
                        <FaXmark /> <span className="sr-only">Close</span>
                      </button>
                    </div>
                  )}

                  {loading && (
                    <div className="absolute inset-0 z-20 backdrop-blur-[2px]">
                      <DotLottieReact
                        src="/animations/Scan.lottie"
                        loop
                        autoplay
                      />
                    </div>
                  )}
                  <img
                    src={preview}
                    alt="resume"
                    className="w-full p-4 object-contain"
                  />
                </div>
              ) : uploading ? (
                <PiReadCvLogo className="size-44 animate-pulse opacity-20" />
              ) : (
                <>
                  <PiReadCvLogo className="size-44 opacity-80" />
                  <p>Your CV will appear here</p>
                </>
              )}
            </Card>
            <Card className="flex overflow-y-scroll hide-scrollbar max-h-[600px]">
              {showResult ? (
                <AtsFeedback result={result} />
              ) : (
                <CardContent className="flex flex-col gap-10">
                  <AtsAnalyzerForm
                    form={form}
                    loading={loading}
                    uploading={uploading}
                    onSubmit={onSubmit}
                    filename={filename}
                    handleFileUpload={handleFileUpload}
                  />
                </CardContent>
              )}
            </Card>
          </div>
          {result && (
            <div className="flex justify-end">
              <Button>Optimize CV </Button>
            </div>
          )}
        </CardContent>
      </Card>
      {/* <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent className="mx-auto h-[90vh] overflow-scroll ">
          <DialogHeader>
            <DialogTitle>Resume</DialogTitle>
            <DialogDescription className="text-sm text-subheadline">
              resume preview
            </DialogDescription>
          </DialogHeader>
          <iframe src={publicUrl!} className="w-full h-[90vh]"></iframe>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default AtsAnalyzerCard;
