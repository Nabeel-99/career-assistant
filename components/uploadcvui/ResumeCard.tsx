"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IoDocumentText } from "react-icons/io5";
import { Button } from "../ui/button";
import { FaEye, FaTrash } from "react-icons/fa";
import { formatTime } from "@/lib/utils";
import { ResumeProps } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import { DeleteDialog } from "../practiceui/DeleteDialog";
import { toast } from "sonner";

const ResumeCard = ({
  loading,
  resumes,
  fetchResumes,
}: {
  resumes: ResumeProps[];
  loading: boolean;
  fetchResumes: () => void;
}) => {
  const [showResume, setShowResume] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);
  const [selectedResumeFilePath, setSelectedResumeFilePath] = useState<
    string | null
  >(null);
  const openPreview = async (publicUrl: string) => {
    if (publicUrl) {
      setPublicUrl(publicUrl);
      setShowResume(true);
    }
  };

  const showDeleteDialog = (id: number, filePath: string) => {
    setSelectedResumeId(id);
    setSelectedResumeFilePath(filePath);
    setShowDelete(true);
  };

  const deleteResume = async (id: number, filePath: string) => {
    try {
      setDeleteLoading(true);
      const res = await axios.delete("/api/parse-cv", {
        data: {
          id,
        },
      });
      if (res.status === 200) {
        setShowDelete(false);
        toast.success("File deleted successfully");
        fetchResumes();
      }
    } catch (error) {
      toast.error("Error deleting file");
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <>
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
                  <div className="flex items-center justify-center p-2 border dark:border-[#343333] dark:bg-[#1f1f1f] rounded-lg">
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
                    onClick={() => openPreview(resume.filePath!)}
                    className="bg-black/10 hover:bg-black/20 text-black dark:bg-[#1f1f1f] dark:hover:bg-[#343333] cursor-pointer rounded-xl dark:text-white"
                  >
                    <FaEye />
                  </Button>
                  <Button
                    onClick={() => {
                      showDeleteDialog(resume.id!, resume.filePath!);
                    }}
                    className="bg-black/10 hover:bg-black/20 text-black dark:bg-[#1f1f1f] dark:hover:bg-[#343333] cursor-pointer rounded-xl dark:text-white"
                  >
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

      {/* show Resume */}
      <Dialog open={showResume} onOpenChange={setShowResume}>
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

      {/* show Delete Dialog */}
      <DeleteDialog
        deleteLoading={deleteLoading}
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        action={() => deleteResume(selectedResumeId!, selectedResumeFilePath!)}
      />
    </>
  );
};

export default ResumeCard;
