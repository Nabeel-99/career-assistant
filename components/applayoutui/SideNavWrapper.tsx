"use client";

import React, { useEffect, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LogoutBtn from "./LogoutBtn";
import Link from "next/link";
import { IoGrid } from "react-icons/io5";
import { RiFileUploadFill } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { User } from "@/lib/generated/prisma";
import { IoMdSettings } from "react-icons/io";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import supabase from "@/lib/supabase";
const SideNavWrapper = ({ user }: { user: User | null }) => {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const isSettingsActive = pathname.startsWith("/settings");
  const navItems = [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: <IoGrid />,
    },
    {
      name: "Upload CV",
      url: "/upload-cv",
      icon: <RiFileUploadFill />,
    },
    {
      name: "Practice",
      url: "/practice",
      icon: <FaMicrophone />,
    },
    {
      name: "CV Templates",
      url: "/cv-templates",
      icon: <HiTemplate />,
    },
  ];

  useEffect(() => {
    const loadAvatar = async () => {
      if (!user?.image?.startsWith("http")) {
        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(user?.image!);
        if (data.publicUrl) {
          setAvatarUrl(`${data.publicUrl}?t=${Date.now()}`);
        }
      } else {
        setAvatarUrl(user?.image);
      }
    };
    loadAvatar();
  }, [user?.image]);
  return (
    <Sidebar className="">
      <SidebarContent className="dark:bg-[#0a0a0a] pt-8 ">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center  mb-5">
            <Avatar className="border">
              <AvatarImage src={avatarUrl!} className="object-cover" />
              <AvatarFallback className="flex items-center">
                <span>{user?.firstname?.charAt(0)} </span>
                <span>{user?.lastname?.charAt(0)}</span>
              </AvatarFallback>
            </Avatar>
            <span className="text-[16px] pl-1">
              {user?.firstname} {user?.lastname}
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1 text-sidebar-foreground/70">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "text-[16px]",
                        isActive && "bg-sidebar-accent"
                      )}
                      onClick={() => setOpenMobile(false)}
                    >
                      <Link
                        href={item.url}
                        className={cn(isActive && "text-black dark:text-white")}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="pl-1">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="dark:bg-[#0a0a0a]">
        <SidebarMenu className="">
          <SidebarMenuItem className="text-sidebar-foreground/70">
            <SidebarMenuButton
              asChild
              className={cn(
                "text-[16px]",
                isSettingsActive && " bg-sidebar-accent"
              )}
            >
              <Link
                href="/settings"
                className={cn(
                  " flex items-center gap-2 w-full",
                  isSettingsActive && "text-black dark:text-white"
                )}
              >
                <span>
                  <IoMdSettings className="text-xl" />
                </span>
                <span className="pl-1">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="">
          <SidebarMenuItem className="text-sidebar-foreground/70">
            <LogoutBtn />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideNavWrapper;
