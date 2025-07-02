"use client";

import PreviewCard from "@/components/cvtemplates/PreviewCard";
import TemplateCard from "@/components/cvtemplates/TemplateCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-sm">Browse CV Templates</h1>
      <div className="flex justify-start">
        {/* <Button>Generate new CV</Button> */}
      </div>

      <div className="flex flex-col gap-6">
        <p className="text-sm font-medium">Browse CV Templates</p>
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(290px,1fr))]">
          {Array.from({ length: 6 }).map((_, item) => (
            <Dialog key={item}>
              <DialogTrigger asChild>
                <div className="w-full cursor-pointer text-left">
                  <TemplateCard />
                </div>
              </DialogTrigger>
              <DialogContent className="grid grid-cols-2 gap-6 xl:h-[700px] xl:w-3/4">
                <div className="">
                  <PreviewCard />
                </div>
                <div className="flex flex-col gap-2">
                  <DialogHeader>
                    <DialogTitle> Plain Classic</DialogTitle>
                    <DialogDescription>
                      A clean, no-frills single-column resume template that
                      keeps the focus on your content. Perfect for professionals
                      who value simplicity and clarity.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-6 items-center justify-center mt-10">
                    <Button>Use This Template</Button>
                    <Button>Start From Scratch</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
      {/* <TemplateOne /> */}
    </div>
  );
};

export default page;
