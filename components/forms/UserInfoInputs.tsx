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

const UserInfoInputs = ({ form }: { form: any }) => {
  const [preview, setPreview] = useState<string | null>(null);
  return (
    <>
      <div className="flex gap-10 items-center">
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
                    const file = e.target.files?.[0];
                    if (file) {
                      const previewUrl = URL.createObjectURL(file);
                      setPreview(previewUrl);
                      form.setValue("image", file);
                      console.log("file", file);
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
          <div className="max-w-40  border rounded overflow-hidden">
            <img
              src={preview!}
              alt="preview"
              className="w-full h-full object-cover"
            />
          </div>
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
