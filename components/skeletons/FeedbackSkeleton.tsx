import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";

const FeedbackSkeleton = () => {
  return (
    <div className="flex flex-col gap-10">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <Skeleton className="h-6 w-24" />
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-6 w-6 rounded-full ring-2 ring-[#4b4b4b]"
                />
              ))}
            </div>
          </CardTitle>

          <CardDescription className="flex flex-col gap-2 mt-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-32" />
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="leading-relaxed space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[85%]" />
          <Skeleton className="h-4 w-[70%]" />
          <div className="flex items-center gap-2 mt-10">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-10" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>
    </div>
  );
};

export default FeedbackSkeleton;
