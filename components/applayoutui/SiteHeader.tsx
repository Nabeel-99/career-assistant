"use client";

import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SlashIcon } from "lucide-react";

const SiteHeader = () => {
  const mapCurrentPage = () => {
    const pathname = usePathname();
    if (pathname.startsWith("/practice/interview")) {
      return (
        <nav className="text-base text-muted-foreground flex items-center gap-2  px-4">
          <Link
            href="/practice"
            className="text-muted-foreground hover:text-white"
          >
            Practice
          </Link>
          <span className="mx-1">/</span>
          <span className="text-white">Interview Room</span>
        </nav>
      );
    }
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/upload-cv":
        return "Upload CV";
      case "/practice":
        return "Practice";

      default:
        return "Dashboard";
    }
  };
  return (
    <header className="flex border-b items-center bg-[#0a0a0a] py-2">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{mapCurrentPage()}</h1>
      </div>
    </header>
  );
};

export default SiteHeader;
