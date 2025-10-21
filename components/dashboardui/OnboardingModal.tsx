"use client";

import { User } from "@/lib/generated/prisma";
import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { PiReadCvLogoLight } from "react-icons/pi";
import { Pi } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { ImSpinner9 } from "react-icons/im";
import { cn } from "@/lib/utils";
import { makeUserNewFalse } from "@/lib/actions/user";
const OnboardingModal = () => {
  const [open, setOpen] = useState(true);
  const [filename, setFilename] = useState("");
  const [uploading, setUploading] = useState(false);
  const uploadFile = async (file: File) => {
    if (!file) return;
    setFilename(file.name);

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/api/parse-cv", formData);
      if (res.status === 200) {
        toast.success("File uploaded successfully");
        setFilename("");
        setOpen(false);
      }
    } catch (error) {
      toast.error("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.includes("pdf")) {
        toast.error("Please upload a PDF file");
        return;
      }

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("File size must be less than 10MB");
        return;
      }
      await uploadFile(file);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Add your CV to make things easier</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 items-center justify-center">
            <PiReadCvLogoLight
              className={`size-52 ${uploading && "animate-pulse"}`}
            />
            <p className="max-w-sm text-center">
              {" "}
              Upload your CV so you can select it later for practice sessions or
              apply it to CV templates.
            </p>
            {filename && (
              <span className="text-sm text-green-600 dark:text-green-400">
                ✓ {filename}
              </span>
            )}
            <Label
              htmlFor="file"
              className={cn(
                `bg-black ${
                  uploading && "pointer-events-none"
                } text-white hover:bg-black/80 dark:bg-[#303030] px-4 py-2 rounded-md cursor-pointer dark:hover:bg-[#343333] transition-all duration-300`
              )}
            >
              {uploading ? "Uploading" : "Upload"} CV
              {uploading && <ImSpinner9 className="animate-spin" />}
            </Label>
            <Input
              id="file"
              type="file"
              accept=".pdf"
              hidden
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => makeUserNewFalse()}>
                Skip for now
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OnboardingModal;
