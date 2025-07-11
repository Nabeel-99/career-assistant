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

  const fetchResumes = async () => {
    try {
      setFetching(true);
      const { data, error } = await supabase.storage
        .from("resumes")
        .list(`${userId}`, {
          sortBy: { column: "name", order: "desc" },
          //   sortBy: { column: "name", order: "desc" },
        });
      if (error) {
        toast.error("Error fetching resumes");
        setFetching(false);
        return [];
      }

      const formatted = data
        .filter((file) => file.name && file.metadata)
        .map((file) => ({
          name: file.name.split("_")[1],
          createdAt: file.created_at,
          filePath: `${userId}/${file.name}`,
        }))
        .filter((file) => file.name !== null);

      setResumes(formatted);
    } catch (error) {
      toast.error("Error fetching resumes");
    } finally {
      setFetching(false);
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFilename(file.name);
    const filePath = `${userId}/${Date.now()}_${file.name}`;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filePath", filePath);
      const res = await axios.post("/api/parse-cv", formData);
      if (res.status === 200) {
        const { data, error } = await supabase.storage
          .from("resumes")
          .upload(filePath, file);
        if (error) {
          toast.error("Error uploading file");
        }
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

  useEffect(() => {
    fetchResumes();
  }, [filename]);
  return (
    <>
      <ResumeCard
        loading={fetching || uploading}
        resumes={resumes}
        fetchResumes={fetchResumes}
      />
      <Card className="flex items-center justify-center  w-full xl:w-3/4">
        <CardContent className="flex flex-col gap-10">
          <div className="border border-dashed p-10 rounded-xl flex flex-col items-center justify-center gap-2 ">
            <RiFileUploadFill className="size-14 text-subheadline" />
            <p className="text-base lg:text-xl text-center">
              Drag and drop your file here
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
              accept=".pdf, .docx"
              hidden
              onChange={handleFileUpload}
            />
            {filename && <span>{filename}</span>}
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-subheadline">Supported Formats</span>
            <div className="flex items-center gap-2">
              <span className="bg-black/20 dark:bg-[#252424] p-2 rounded-md text-sm">
                PDF
              </span>
              <span className="bg-black/20 dark:bg-[#252424] p-2 rounded-md text-sm">
                DOCX
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UploadCard;
