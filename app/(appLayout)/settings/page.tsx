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
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      setUploading(false);
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size must be less than 5MB");
      setUploading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.put("/api/account/avatar", formData);
      if (res.status === 200) {
        setAvatarUrl(res.data.avatarUrl);
        getUserDetails();
        toast.success("Profile picture updated successfully");
      }
    } catch (error) {
      toast.error("Error uploading file");
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
        setAvatarUrl(res.image);
      }
    } catch (error) {
      toast.error("Error fetching user details");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

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
