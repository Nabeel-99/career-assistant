"use client";
import { useState, useEffect } from "react";
import SideNavWrapper from "./SideNavWrapper";
import { User } from "@/lib/generated/prisma";
import { fetchUser } from "@/lib/action";
import { toast } from "sonner";

const SideNav = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await fetchUser();
        setUser(res);
      } catch (error) {
        toast.error("Error fetching user details");
      }
    };
    getUserDetails();
  }, []);

  return <SideNavWrapper user={user} />;
};

export default SideNav;
