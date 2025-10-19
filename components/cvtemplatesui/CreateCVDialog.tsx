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
  closeParentDialog,
  refetchResumes,
}: {
  templateName: string;
  userId: string;
  closeParentDialog: () => void;
  refetchResumes: () => Promise<void>;
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
          closeParentDialog={closeParentDialog}
          refetchResumes={refetchResumes}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCVDialog;
