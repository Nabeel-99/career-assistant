"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Resume } from "@/lib/generated/prisma";
import PracticeForm from "../forms/PracticeForm";
import { fetchResumes } from "@/lib/action";
import { toast } from "sonner";

const CreatePracticeBtn = ({
  userId,
  getUserPractices,
  betaUser,
}: {
  userId: string;
  getUserPractices: () => void;
  betaUser?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [fetchingResumes, setFetchingResumes] = useState(false);
  const getUserResumes = async () => {
    try {
      setFetchingResumes(true);
      const res = await fetchResumes(userId);
      setResumes(res);
    } catch (error) {
      toast.error("Error fetching resumes");
    } finally {
      setFetchingResumes(false);
    }
  };
  useEffect(() => {
    getUserResumes();
  }, [userId]);

  if (betaUser === false) {
    toast.info("You need to be a beta user to create a practice");
  }
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button disabled={betaUser === false} className="max-w-44">
            Create Practice
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className=" overflow-scroll hide-scrollbar w-full  "
        >
          <SheetHeader>
            <SheetTitle>Create Practice</SheetTitle>
            <SheetDescription>
              Customize and create your personalized interview practice.
            </SheetDescription>
          </SheetHeader>
          <PracticeForm
            userId={userId}
            resumes={resumes}
            getUserPractices={getUserPractices}
            fetchingResumes={fetchingResumes}
            closeSheet={() => setOpen(false)}
          />
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreatePracticeBtn;
