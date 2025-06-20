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
} from "./ui/sidebar";
import { IoGrid } from "react-icons/io5";
import { RiFileUploadFill } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { HiTemplate } from "react-icons/hi";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import LogoutBtn from "./LogoutBtn";
const SideNav = async () => {
  const session = await auth();
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });

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
      name: "Feedback",
      url: "/feedback",
      icon: <AiFillMessage />,
    },
    {
      name: "CV Templates",
      url: "/templates",
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
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild className="text-[16px]">
                    <Link href={item.url} className=" ">
                      <span className="text-xl">{item.icon}</span>
                      <span className="pl-1">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-[#0a0a0a]">
        <SidebarMenu className="">
          <SidebarMenuItem className="text-sidebar-foreground/70">
            <SidebarMenuButton className="text-[16px]">
              <LogoutBtn />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideNav;
