import React from "react";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const CallCardSkeleton = () => {
  return (
    <>
      <Card className="w-full @container/card bg-[#0a0a0a] p-6 lg:p-10 xl:w-[1050px] flex flex-col gap-10 h-full">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="flex items-center bg-[#111111] xl:p-20 justify-center">
            <Skeleton className="size-24 xl:size-44 rounded-full" />
          </Card>
          <Card className="flex items-center bg-[#111111] xl:p-20 justify-center">
            <Skeleton className="size-24 xl:size-44 rounded-full" />
          </Card>
        </div>

        {/* Add more skeletons for transcripts section if needed */}
      </Card>

      <div className="flex flex-col h-full items-center gap-6 justify-start">
        <Skeleton className="p-6 rounded-full size-16" />
        <Skeleton className="p-6 rounded-full size-16" />
      </div>
    </>
  );
};

export default CallCardSkeleton;
