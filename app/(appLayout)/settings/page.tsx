"use client";

import { AccountCard } from "@/components/settingsui/AccountCard";
import DeleteAccountCard from "@/components/settingsui/DeleteAccountCard";
import ProfilePictureCard from "@/components/settingsui/ProfilePictureCard";
import ThemeCard from "@/components/settingsui/ThemeCard";
import { Card } from "@/components/ui/card";
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
    <Card className="border flex flex-col gap-10 p-4 md:p-10">
      <ProfilePictureCard
        uploading={uploading}
        avatarUrl={avatarUrl!}
        user={user}
        handleFileUpload={handleFileUpload}
      />
      <ThemeCard />
      <AccountCard user={user} loading={loading} />
      <DeleteAccountCard />
    </Card>
  );
};

export default page;
