"use client";
import { useState, useEffect } from "react";
import SideNavWrapper from "./SideNavWrapper";
import { User } from "@/lib/generated/prisma";

import { toast } from "sonner";
import { fetchUser } from "@/lib/actions/user";

const SideNav = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        setLoading(true);
        const res = await fetchUser();
        setUser(res);
      } catch (error) {
        toast.error("Error fetching user details");
      } finally {
        setLoading(false);
      }
    };
    getUserDetails();
  }, []);

  return <SideNavWrapper loading={loading} user={user} />;
};

export default SideNav;
