import React from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Resume } from "@/app/generated/prisma";
import PracticeForm from "./forms/PracticeForm";

const CreatePracticeBtn = ({ resumes }: { resumes: Resume[] }) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex w-full justify-start items-center">
            <Button className="">Create Practice</Button>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className=" overflow-scroll hide-scrollbar ">
          <SheetHeader>
            <SheetTitle>Create Practice</SheetTitle>
            <SheetDescription>
              Customize and create your personalized interview practice.
            </SheetDescription>
          </SheetHeader>
          <PracticeForm resumes={resumes} />
          <SheetFooter>
            <Button type="submit">Generate Interview</Button>
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
