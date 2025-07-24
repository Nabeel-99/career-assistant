"use client";

import React, { useEffect, useState } from "react";
import CreatePracticeBtn from "./CreatePracticeBtn";
import PracticeCardGrid from "./PracticeCardGrid";
import { fetchPractices } from "@/lib/action";
import { PracticeWithFeedback } from "@/lib/types";
import { toast } from "sonner";

const PracticeWrapper = ({ userId }: { userId: string }) => {
  const [practices, setPractices] = useState<PracticeWithFeedback[]>([]);
  const [loading, setLoading] = useState(false);
  const getUserPractices = async () => {
    try {
      setLoading(true);
      const res = await fetchPractices(userId);
      setPractices(res);
    } catch (error) {
      toast.error("Error fetching practices");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserPractices();
  }, [userId]);
  return (
    <>
      <CreatePracticeBtn userId={userId} getUserPractices={getUserPractices} />
      <PracticeCardGrid
        practices={practices}
        loading={loading}
        getUserPractices={getUserPractices}
      />
    </>
  );
};

export default PracticeWrapper;
