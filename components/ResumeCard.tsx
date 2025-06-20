"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IoDocumentText } from "react-icons/io5";
import { Button } from "./ui/button";
import { FaEye, FaTrash } from "react-icons/fa";
import { formatTime } from "@/lib/utils";
import { ResumeProps } from "@/lib/types";
import supabase from "@/lib/supabase";

const ResumeCard = ({
  loading,
  resumes,
}: {
  resumes: ResumeProps[];
  loading: boolean;
}) => {
  console.log("resumes", resumes);
  return (
    <Card className="w-full min-h-[200px] max-h-[250px]   overflow-scroll hide-scrollbar xl:max-h-[600px]">
      <CardHeader>
        <CardTitle>
          <p>My Resumes</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {loading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="w-full h-10 rounded-md" />
            <Skeleton className="w-full h-10 runded-md" />
            <Skeleton className="w-full h-10 runded-md" />
          </div>
        ) : resumes.length > 0 ? (
          resumes.map((resume, index) => (
            <div
              className="flex items-center justify-between gap-2"
              key={index}
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center p-2 border border-[#343333] bg-[#1f1f1f] rounded-lg">
                  <IoDocumentText className="xl:size-8" />
                </div>
                <div className="flex flex-col text-sm xl:text-base">
                  <span>{resume.name}</span>
                  <span className="text-subheadline text-sm">
                    uploaded {formatTime(resume.createdAt)}{" "}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={async () => {
                    if (!resume.filePath) return;
                    const { data } = supabase.storage
                      .from("resumes")
                      .getPublicUrl(resume.filePath);
                    if (data.publicUrl) {
                      window.open(data.publicUrl, "_blank");
                    }
                  }}
                  className="bg-[#1f1f1f] hover:bg-[#343333] cursor-pointer rounded-xl text-white"
                >
                  <FaEye />
                </Button>
                <Button className="bg-[#1f1f1f] hover:bg-[#343333] cursor-pointer rounded-xl text-white">
                  <FaTrash />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-subheadline text-sm text-center">
            You haven&apos;t uploaded any resumes
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeCard;
