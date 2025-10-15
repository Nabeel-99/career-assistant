"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RiFileUploadFill } from "react-icons/ri";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import supabase from "@/lib/supabase";
import { toast } from "sonner";
import ResumeCard from "./ResumeCard";
import axios from "axios";
import { ResumeProps } from "@/lib/types";

const UploadCard = ({ userId }: { userId: string | undefined }) => {
  const [filename, setFilename] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [resumes, setResumes] = useState<ResumeProps[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const fetchResumes = async () => {
    try {
      setFetching(true);
      // Fetch from your database instead of just Supabase storage
      const res = await axios.get(`/api/resumes`);

      if (res.status === 200) {
        setResumes(res.data.resumes);
      }
    } catch (error) {
      toast.error("Error fetching resumes");
    } finally {
      setFetching(false);
    }
  };

  const uploadFile = async (file: File) => {
    if (!file) return;
    setFilename(file.name);

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/api/parse-cv", formData);
      if (res.status === 200) {
        fetchResumes();
        toast.success("File uploaded successfully");
        setFilename("");
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (!droppedFile.type.includes("pdf")) {
        toast.error("Please upload a PDF file");
        return;
      }
      const maxSize = 10 * 1024 * 1024;
      if (droppedFile.size > maxSize) {
        toast.error("File size must be less than 10MB");
        return;
      }
      await uploadFile(droppedFile);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <>
      <ResumeCard
        loading={fetching || uploading}
        resumes={resumes}
        fetchResumes={fetchResumes}
      />
      <Card className="flex items-center justify-center w-full xl:w-3/4">
        <CardContent className="flex flex-col gap-10">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed p-10 rounded-xl flex flex-col items-center justify-center gap-2 
              transition-all duration-200
              ${
                isDragging
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                  : "border-gray-300 dark:border-gray-700"
              }
            `}
          >
            <RiFileUploadFill className="size-14 text-subheadline" />
            <p className="text-base lg:text-xl text-center">
              {isDragging
                ? "Drop your file here"
                : "Drag and drop your file here"}
            </p>
            <span>or</span>
            <Label
              htmlFor="file"
              className="bg-black/20 hover:bg-black/30 dark:bg-[#303030] px-4 py-2 rounded-md cursor-pointer dark:hover:bg-[#343333] transition-all duration-300"
            >
              Choose File
            </Label>
            <Input
              id="file"
              type="file"
              accept=".pdf"
              hidden
              onChange={handleFileUpload}
              disabled={uploading}
            />
            {filename && (
              <span className="text-sm text-green-600 dark:text-green-400">
                ✓ {filename}
              </span>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-subheadline">
              Supported Format: .pdf (max 10MB)
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UploadCard;
