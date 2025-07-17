"use client";
import React, { useState } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import CropImage from "./CropImage";
import { Button } from "../ui/button";

const UserInfoInputs = ({
  form,
  setCroppedFile,
}: {
  form: any;
  setCroppedFile: (file: File) => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setShowCropModal(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="flex  gap-10 items-center">
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="w-full">
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageChange(e);
                    const file = e.target.files?.[0];
                    if (file) {
                      const previewUrl = URL.createObjectURL(file);
                      setPreview(previewUrl);
                      form.setValue("image", file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* preview image */}
        {preview && (
          <>
            <div className="flex flex-col gap-2">
              <div className="max-w-40  border rounded overflow-hidden">
                <img
                  src={preview!}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="">
                <Button type="button" onClick={() => setShowCropModal(true)}>
                  Resize
                </Button>
              </div>
            </div>

            <CropImage
              form={form}
              setPreview={setPreview}
              setCroppedFile={setCroppedFile}
              image={selectedImage!}
              open={showCropModal}
              closeModal={() => setShowCropModal(false)}
            />
          </>
        )}
      </div>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter title e.g Software Engineer, UI/UX Designer..."
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fullname"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter your full name"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter your email" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter your phone number"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Enter your location" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter your summary" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </>
  );
};

export default UserInfoInputs;
