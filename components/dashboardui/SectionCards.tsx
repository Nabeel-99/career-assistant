"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaLightbulb } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { fetchRecentActivity } from "@/lib/action";
import { FaMicrophone } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";

import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { cn, TIPS } from "@/lib/utils";

type Activity = {
  type: string;
  timestamp: Date;
  name: string;
};
const SectionCards = () => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [fetching, setFetching] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setTipIndex((prev) => (prev + 1) % TIPS.length);
        setVisible(true);
      }, 300);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchUserActivity = async () => {
      try {
        setFetching(true);
        const res = await fetchRecentActivity();
        if (res) {
          setActivity(res);
        }
      } catch (error) {
        toast.error("Error fetching activity");
      } finally {
        setFetching(false);
      }
    };
    fetchUserActivity();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "resume":
        return <IoDocumentText className="size-6" />;
      case "template":
        return <HiTemplate className="size-6" />;
      case "practice":
        return <FaMicrophone className="size-6" />;
      default:
        return null;
    }
  };

  const formatTime = (input: any) => {
    const date = new Date(input);
    if (isNaN(date.getTime())) return "Invalid time";
    return formatDistanceToNow(date, { addSuffix: true });
  };
  return (
    <>
      <Card className="@container/card w-full">
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2">
            <div className="flex items-center justify-center p-2 border dark:border-[#343333] dark:bg-[#1f1f1f] rounded-lg">
              <FaLightbulb className="size-8" />
            </div>
            <p className="text-xl">AI Tips to improve</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={cn(
              " transition-opacity duration-300 ease-in-out",
              visible ? "opacity-100" : "opacity-0"
            )}
          >
            {TIPS[tipIndex]}
          </p>
        </CardContent>
      </Card>
      <Card className="@container/card w-full">
        <CardHeader className="">
          <CardTitle className="">
            <p className="text-xl">Recent Activity</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {fetching ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center p-2 border dark:border-[#343333] dark:bg-[#1f1f1f] rounded-lg">
                <Skeleton className="h-8 w-8 rounded" />
              </div>

              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ) : (
      {activity.name && activity.timestamp ? (
          <div className="flex items-center gap-2">
              <div className="flex items-center justify-center p-2 border dark:border-[#343333] dark:bg-[#1f1f1f] rounded-lg">
                {getIcon(activity?.type!)}
              </div>
              <div className="flex flex-col">
                <span>{activity?.name}</span>
                <span className="text-subheadline">
                  {formatTime(activity?.timestamp)}{" "}
                </span>
              </div>
            </div>
      ) : (
        <p>No recent activity</p>

          
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default SectionCards;
