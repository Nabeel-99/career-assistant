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

const CreateCVDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New CV</Button>
      </DialogTrigger>
      <DialogContent className="w-full md:w-2/4 overflow-scroll h-full">
        <DialogHeader>
          <DialogTitle>Create New CV</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new CV
          </DialogDescription>
        </DialogHeader>
        <CVForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCVDialog;
