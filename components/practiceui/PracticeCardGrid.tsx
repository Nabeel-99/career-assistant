"use client";

import React from "react";
import PracticeCard from "./PracticeCard";
import { Skeleton } from "../ui/skeleton";
import { useSidebar } from "../ui/sidebar";
import { PracticeWithFeedback } from "@/lib/types";

const PracticeCardGrid = ({
  loading,
  practices,
}: {
  loading: boolean;
  practices: PracticeWithFeedback[];
}) => {
  const { open } = useSidebar();
  return loading ? (
    <div
      className={`grid grid-cols-1 ${
        open ? "md:grid-cols-1" : "md:grid-cols-2"
      } xl:grid-cols-3 gap-6`}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton className="h-[400px] rounded-lg" key={index} />
      ))}
    </div>
  ) : (
    <>
      <div
        className={`grid grid-cols-1 ${
          open ? "md:grid-cols-1" : "md:grid-cols-2"
        } xl:grid-cols-3 gap-6`}
      >
        {practices.map((practice) => (
          <PracticeCard key={practice.id} {...practice} />
        ))}
      </div>
      {practices.length === 0 && (
        <div className="text-left text-sm text-subheadline">
          <p>You have not created any practice yet</p>
        </div>
      )}
    </>
  );
};

export default PracticeCardGrid;
