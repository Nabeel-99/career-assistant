"use client";

import { AccountCard } from "@/components/AccountCard";
import DeleteAccountCard from "@/components/DeleteAccountCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUser } from "@/lib/action";
import { User } from "@/lib/generated/prisma";
import supabase from "@/lib/supabase";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    const filePath = `${user?.id}/avatar.jpg`;
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filePath", filePath);
      const res = await axios.put("/api/account/avatar", formData);
      if (res.status === 200) {
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(filePath, file, {
            upsert: true,
          });
        if (error) {
          console.log("error uploading file", error);
          toast.error("Error uploading file");
        }
        getUserDetails();
        toast.success("Profile picture updated successfully");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setUploading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await fetchUser();

      setUser(res);
      if (res?.image) {
        if (!res.image.startsWith("http")) {
          const { data } = supabase.storage
            .from("avatars")
            .getPublicUrl(res.image);
          if (data.publicUrl) {
            setAvatarUrl(`${data.publicUrl}?t=${Date.now()}`);
          }
        } else {
          setAvatarUrl(res.image);
        }
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, [user?.image]);

  return (
    <Card className="border flex flex-col gap-10 p-10">
      <div className="flex items-center gap-6">
        {uploading ? (
          <Skeleton className="w-full rounded-full size-20 xl:size-29" />
        ) : (
          <Avatar className="size-20 xl:size-28">
            <AvatarImage
              src={avatarUrl!}
              alt={user?.firstname!}
              className="backdrop-blur-lg rounded-full object-cover bg-white/40"
            />
            <AvatarFallback>{user?.firstname}</AvatarFallback>
          </Avatar>
        )}
        <Label
          htmlFor="file"
          className="bg-primary px-4 py-3 text-black rounded-md cursor-pointer hover:bg-primary/90"
        >
          Edit Profile picture
        </Label>
        <Input
          id="file"
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileUpload}
        />
      </div>
      <AccountCard user={user} loading={loading} />
      <DeleteAccountCard />
    </Card>
  );
};

export default page;
