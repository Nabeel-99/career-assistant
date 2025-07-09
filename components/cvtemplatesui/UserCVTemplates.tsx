"use client";
import { fetchResumeWithContent } from "@/lib/action";
import { Resume } from "@/lib/generated/prisma";
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { templateMap } from "@/lib/templateMap";
import { Button } from "../ui/button";
import { z } from "zod";
import { resumeSchema } from "@/lib/validation";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

type Content = z.infer<typeof resumeSchema>;
const UserCVTemplates = ({ userId }: { userId: string }) => {
  const [userTemplates, setUserTemplates] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `Resume-${Date.now()}`,
    pageStyle: `@media print { @page { size: A4; margin: 5mm } }`,
    onAfterPrint() {
      toast("Print dialog closed", {
        description: "If saved, check your downloads.",
      });
    },
  });
  const fetchUserTemplates = async () => {
    try {
      setLoading(true);
      const res = await fetchResumeWithContent(userId);
      console.log("res", res);
      setUserTemplates(res);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
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
          const TemplateComponent = template.template
            ? templateMap[template.template]
            : null;
          if (!TemplateComponent || !template.content) return null;
          const content = template.content as Content;
          const resumeId = `resume-template-${index}`;
          return (
            <div className="flex flex-col gap-2" key={index}>
              {/* printable resume */}
              <div className="sr-only print:block">
                <div ref={contentRef}>
                  <TemplateComponent content={content} />
                </div>
              </div>

              {/* preview resume */}
              <div className="border bg-white rounded max-h-[400px] overflow-hidden shadow">
                <div
                  className="origin-top-left w-full  scale-[0.4] "
                  style={{
                    width: "794px",
                    height: "1123px",
                  }}
                >
                  <TemplateComponent content={content} resumeId={resumeId} />
                </div>
              </div>

              <Button onClick={reactToPrintFn} className="cursor-pointer ">
                Export PDF
              </Button>
            </div>
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
