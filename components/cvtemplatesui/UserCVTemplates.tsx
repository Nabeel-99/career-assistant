"use client";
import { deleteUserTemplate, fetchResumeWithContent } from "@/lib/action";
import { Resume } from "@/lib/generated/prisma";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

import { z } from "zod";
import { resumeSchema } from "@/lib/validation";
import { toast } from "sonner";
import ResumeTemplate from "./ResumeTemplate";

type Content = z.infer<typeof resumeSchema>;
const UserCVTemplates = ({ userId }: { userId: string }) => {
  const [userTemplates, setUserTemplates] = useState<Resume[]>([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchUserTemplates = async () => {
    try {
      setLoading(true);
      const res = await fetchResumeWithContent(userId);
      setUserTemplates(res);
    } catch (error) {
      toast.error("Error fetching resumes");
    } finally {
      setLoading(false);
    }
  };
  const deleteResume = async (resumeId: number) => {
    try {
      setDeleteLoading(true);
      const res = await deleteUserTemplate(resumeId);
      if (res.success) {
        toast.success("Template deleted successfully");
        fetchUserTemplates();
      }
    } catch (error) {
      toast.error("Error deleting template");
    } finally {
      setDeleteLoading(false);
    }
  };
  useEffect(() => {
    fetchUserTemplates();
  }, [userId]);

  return loading ? (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(290px,1fr))]">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton className="h-[100px] rounded-lg" key={index} />
      ))}
    </div>
  ) : (
    <>
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(290px,1fr))]">
        {userTemplates.map((template, index) => {
          if (!template.content) return null;
          const content = template.content as Content;
          const resumeId = `resume-template-${index}`;

          return (
            <ResumeTemplate
              key={index}
              templateId={template.id}
              templateName={template.template!}
              content={content}
              resumeId={resumeId}
              deleteLoading={deleteLoading}
              deleteResume={deleteResume}
            />
          );
        })}
      </div>
      {!loading &&
        userTemplates.filter((t) => t.template && t.content).length === 0 && (
          <div className="text-left text-sm text-subheadline">
            <p className="">You have not created any CV template yet</p>
          </div>
        )}
    </>
  );
};

export default UserCVTemplates;
