import SideNav from "@/components/SideNav";
import SiteHeader from "@/components/SiteHeader";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider className="">
      <SideNav />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col  bg-linear-to-bl from-[#0a0a0a] from-[36%] to-[#171717] to-[86%]">
          <div className="@container/main   flex flex-1 flex-col gap-2">
            {/* <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div> */}
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
