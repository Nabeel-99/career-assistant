"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback } from "../ui/avatar";

const PracticeHeaderSkeleton = () => {
  return (
    <div className="flex flex-col absolute bg-white dark:bg-[#0a0a0a] mask-b-from-80% z-20 pb-10 border-none top-10 right-10 left-10 gap-2">
      <div className="flex flex-col gap-4 md:flex-row items-start md:justify-between">
        <div className="flex flex-col gap-2">
          {/* Title skeleton */}
          <Skeleton className="h-7 w-64" />
          {/* Level skeleton */}
          <Skeleton className="h-5 w-32" />
        </div>

        {/* Stack avatars skeleton */}
        <div className="order-first md:order-last flex -space-x-1">
          {[...Array(3)].map((_, index) => (
            <Avatar className="size-6" key={index}>
              <AvatarFallback>
                <Skeleton className="size-6 rounded-full" />
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};

export default PracticeHeaderSkeleton;
