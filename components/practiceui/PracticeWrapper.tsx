"use client";

import React, { useEffect, useState } from "react";
import CreatePracticeBtn from "./CreatePracticeBtn";
import PracticeCardGrid from "./PracticeCardGrid";
import { fetchPractices } from "@/lib/action";
import { PracticeWithFeedback } from "@/lib/types";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import CodingTab from "./CodingTab";

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
      <Tabs defaultValue="theoretical">
        <TabsList>
          <TabsTrigger value="theoretical">Theoretical</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
        </TabsList>
        <TabsContent value="theoretical">
          <div className="flex flex-col gap-4 mt-4">
            <CreatePracticeBtn
              userId={userId}
              getUserPractices={getUserPractices}
            />
            <PracticeCardGrid
              practices={practices}
              loading={loading}
              getUserPractices={getUserPractices}
            />
          </div>
        </TabsContent>
        <TabsContent value="coding">
          <CodingTab />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default PracticeWrapper;
