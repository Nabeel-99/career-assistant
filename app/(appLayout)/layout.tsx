import SideNav from "@/components/applayoutui/SideNav";
import SiteHeader from "@/components/applayoutui/SiteHeader";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider className="">
      <SideNav />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-6  bg-linear-to-bl from-[#0a0a0a] from-[36%] to-[#171717] to-[86%]">
          <div className="@container/main   flex flex-1 flex-col gap-2">
            <Toaster />
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
