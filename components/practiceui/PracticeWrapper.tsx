"use client";

import React, { useEffect, useState } from "react";
import CreatePracticeBtn from "./CreatePracticeBtn";
import PracticeCardGrid from "./PracticeCardGrid";
import { fetchPractices } from "@/lib/action";
import { PracticeWithFeedback } from "@/lib/types";

const PracticeWrapper = ({ userId }: { userId: string }) => {
  const [practices, setPractices] = useState<PracticeWithFeedback[]>([]);
  const [loading, setLoading] = useState(false);
  const getUserPractices = async () => {
    try {
      setLoading(true);
      const res = await fetchPractices(userId);

      setPractices(res);
    } catch (error) {
      console.log("something went wrong", error);
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
      <PracticeCardGrid practices={practices} loading={loading} />
    </>
  );
};

export default PracticeWrapper;
