"use client";

import React, { useState } from "react";

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
  setOpenPreviewCard,
}: {
  templateName: string;
  userId: string;
  setOpenPreviewCard: (openPreviewCard: boolean) => void;
}) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Dialog open={openForm} onOpenChange={setOpenForm}>
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
        <CVForm
          userId={userId}
          templateName={templateName}
          setOpenForm={setOpenForm}
          setOpenPreviewCard={setOpenPreviewCard}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCVDialog;
