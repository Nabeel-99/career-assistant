"use client";

import React from "react";

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
const SideNavWrapper = ({ user }: { user: User | null }) => {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();
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
  return (
    <Sidebar className="">
      <SidebarContent className="bg-[#0a0a0a] pt-8 ">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center  mb-5">
            <Avatar>
              <AvatarImage src={user?.image!} />
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
                      <Link href={item.url} className=" ">
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
      <SidebarFooter className="bg-[#0a0a0a]">
        <SidebarMenu className="">
          <SidebarMenuItem className="text-sidebar-foreground/70">
            <SidebarMenuButton
              className={cn(
                "text-[16px]",
                isSettingsActive && "bg-sidebar-accent"
              )}
            >
              <Link href="/settings" className=" flex items-center gap-2">
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
