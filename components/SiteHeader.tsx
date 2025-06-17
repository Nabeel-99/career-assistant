"use client";

import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";

const SiteHeader = () => {
  const mapCurrentPage = () => {
    const pathname = usePathname();
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
        {/* <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div> */}
      </div>
    </header>
  );
};

export default SiteHeader;
