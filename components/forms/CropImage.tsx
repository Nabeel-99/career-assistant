"use client";

import React, { useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { Slider } from "../ui/slider";
import { cn, dataURLtoFile, getCroppedImg } from "@/lib/utils";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const CropImage = ({
  open,
  closeModal,
  image,
  setCroppedFile,
  setPreview,
  form,
}: {
  form: any;
  open: boolean;
  closeModal: () => void;
  image: string;
  setCroppedFile: (file: File) => void;
  setPreview: (preview: string) => void;
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const saveImage = async () => {
    if (croppedAreaPixels) {
      const canvas = await getCroppedImg(image, croppedAreaPixels);
      const croppedFile = dataURLtoFile(
        canvas.toDataURL(),
        "cropped-image.jpeg"
      );

      setCroppedFile(croppedFile);
      const croppedPreviewUrl = URL.createObjectURL(croppedFile);
      setPreview(croppedPreviewUrl);
      form.setValue("image", croppedFile);
      closeModal();
    }
  };

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg">Crop Your Image</DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-[300px] bg-muted rounded overflow-hidden">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        <div className="px-2">
          <label className="text-sm font-medium mb-1 block">Zoom</label>
          <Slider
            min={1}
            max={3}
            step={0.1}
            value={[zoom]}
            onValueChange={(val) => setZoom(val[0])}
            className={cn("w-full")}
          />
        </div>

        <DialogFooter className="mt-4">
          <Button type="button" variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="button" onClick={saveImage}>
            Save Crop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CropImage;
