"use client";

import React from "react";
import PracticeCard from "./PracticeCard";
import { Skeleton } from "../ui/skeleton";
import { useSidebar } from "../ui/sidebar";
import { PracticeWithFeedback } from "@/lib/types";

const PracticeCardGrid = ({
  loading,
  practices,
  getUserPractices,
}: {
  loading: boolean;
  practices: PracticeWithFeedback[];
  getUserPractices: () => void;
}) => {
  const { open } = useSidebar();

  return loading ? (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton className="h-[400px] rounded-lg" key={index} />
      ))}
    </div>
  ) : (
    <>
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {practices.map((practice) => (
          <PracticeCard
            key={practice.id}
            {...practice}
            getUserPractices={getUserPractices}
          />
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
