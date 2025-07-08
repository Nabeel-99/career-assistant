"use client";
import { useState, useEffect } from "react";
import SideNavWrapper from "./SideNavWrapper";
import { User } from "@/lib/generated/prisma";
import { fetchUser } from "@/lib/action";

const SideNav = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await fetchUser();
        setUser(res);
      } catch (error) {
        console.log("error", error);
      }
    };
    getUserDetails();
  }, []);

  return <SideNavWrapper user={user} />;
};

export default SideNav;
