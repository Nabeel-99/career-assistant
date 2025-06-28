"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { fetchPractices } from "@/lib/action";
import { generateChartData } from "@/lib/helper";
import { ActivityData } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";

const ChartCard = ({ userId }: { userId: string }) => {
  const isMobile = useIsMobile();
  const chartConfig = {
    practice: {
      label: "Practice",
    },
    feedbacks: {
      label: "Feedbacks",
    },
  } satisfies ChartConfig;
  const [data, setData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetchPractices(userId);
      const activityData = generateChartData(res);
      setData(activityData);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [userId]);
  // mock data
  // const activityData = [
  //   { date: "2025-06-13", practice: 2, feedbacks: 1 },
  //   { date: "2025-06-14", practice: 1, feedbacks: 0 },
  //   { date: "2025-06-15", practice: 3, feedbacks: 2 },
  //   { date: "2025-06-16", practice: 0, feedbacks: 1 },
  //   { date: "2025-06-17", practice: 2, feedbacks: 2 },
  //   { date: "2025-06-18", practice: 1, feedbacks: 0 },
  //   { date: "2025-06-19", practice: 0, feedbacks: 3 },
  //   { date: "2025-06-20", practice: 1, feedbacks: 1 },
  //   { date: "2025-06-21", practice: 2, feedbacks: 2 },
  //   { date: "2025-06-22", practice: 1, feedbacks: 0 },
  //   { date: "2025-06-23", practice: 0, feedbacks: 3 },
  //   { date: "2025-06-24", practice: 1, feedbacks: 1 },
  //   { date: "2025-06-25", practice: 2, feedbacks: 2 },
  //   { date: "2025-06-26", practice: 1, feedbacks: 0 },
  //   { date: "2025-06-27", practice: 0, feedbacks: 3 },
  //   { date: "2025-06-28", practice: 1, feedbacks: 1 },
  //   { date: "2025-06-29", practice: 2, feedbacks: 2 },
  //   { date: "2025-06-30", practice: 1, feedbacks: 0 },
  // ];
  return (
    <Card className="@container/card w-full">
      <CardHeader>
        <CardTitle>Activity Overview</CardTitle>
        <CardDescription>Total for last 7 days</CardDescription>
      </CardHeader>
      {loading ? (
        <div className="px-4">
          <Skeleton className="aspect-auto h-[250px] lg:h-[450px] w-full" />
        </div>
      ) : (
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] lg:h-[450px] w-full"
          >
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="fillPractice"
                  x1={"0"}
                  y1={"0"}
                  x2={"0"}
                  y2={"1"}
                >
                  <stop offset="5%" stopColor="#d4d4d8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#18181b" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient
                  id="fillFeedbacks"
                  x1={"0"}
                  y1={"0"}
                  x2={"0"}
                  y2={"1"}
                >
                  <stop offset="5%" stopColor="#d4d4d8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#18181b" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey={"date"}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-Us", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                defaultIndex={isMobile ? -1 : 10}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-Us", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey={"practice"}
                type={"monotone"}
                fill="url(#fillPractice)"
                stroke="var(--color-primary)"
                stackId={"a"}
              />
              <Area
                dataKey={"feedbacks"}
                type={"monotone"}
                fill="url(#fillFeedbacks)"
                stroke="var(--color-primary)"
                stackId={"a"}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
};

export default ChartCard;
