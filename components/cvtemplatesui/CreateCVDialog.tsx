"use client";

import React from "react";

import CVForm from "../forms/CVForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

const CreateCVDialog = ({
  templateName,
  userId,
}: {
  templateName: string;
  userId: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New CV</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="w-full md:w-2/4 overflow-scroll h-8/9"
      >
        <DialogHeader>
          <DialogTitle>Create New CV</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new CV
          </DialogDescription>
        </DialogHeader>
        <CVForm userId={userId} templateName={templateName} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCVDialog;
