"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-start">
        <Button>Generate new CV</Button>
      </div>

      {/* <div className="flex flex-col gap-6">
        <p className="text-sm font-medium">Browse CV Templates</p>
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(290px,1fr))]">
          {Array.from({ length: 6 }).map((_, item) => (
            <TemplateCard key={item} />
          ))}

        </div>
      </div> */}
    </div>
  );
};

export default page;
