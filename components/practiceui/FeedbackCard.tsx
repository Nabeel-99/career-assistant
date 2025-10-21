"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PracticeWithFeedback } from "@/lib/types";
import { Separator } from "../ui/separator";
import { formatDate, getDevIconUrl } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import FeedbackSkeleton from "../skeletons/FeedbackSkeleton";
import { toast } from "sonner";
import { SiGooglegemini } from "react-icons/si";
import ReactMarkdown from "react-markdown";
import { fetchPracticeById } from "@/lib/actions/practice";
const FeedbackCard = ({ id }: { id: string }) => {
  const [feedback, setFeedback] = useState<PracticeWithFeedback | null>(null);
  const [fetching, setFetching] = useState(true);
  const fetchFeedback = async () => {
    try {
      setFetching(true);
      const res = await fetchPracticeById(id);
      console.log("feedback", res);
      setFeedback(res);
    } catch (error) {
      toast.error("Error fetching feedback");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);
  return fetching ? (
    <FeedbackSkeleton />
  ) : (
    <div className="flex flex-col gap-10">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Feedback</span>
            <div className="*:data-[slot=avatar]:ring-[#c3c3c3] dark:*:data-[slot=avatar]:ring-[#4b4b4b]  flex -space-x-1 *:data-[slot=avatar]:ring-2 ">
              {feedback?.stacks.map((stack, index) => (
                <Avatar className="size-6" key={index}>
                  <AvatarImage
                    src={getDevIconUrl(stack)}
                    alt={stack}
                    className="backdrop-blur-lg rounded-full bg-white/40"
                  />
                  <AvatarFallback>{stack}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </CardTitle>
          <CardDescription className="flex flex-col gap-2 mt-2">
            <p>{feedback?.title}</p>
            <p>{feedback?.description}.</p>
            <p className="italic text-sm">
              {formatDate(feedback?.feedback?.createdAt!)}
            </p>
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="leading-relaxed">
          {feedback?.feedback?.comment?.length! > 0 ? (
            <>
              <div
                className="prose prose-slate max-w-none dark:prose-invert 
                      prose-headings:font-bold prose-headings:text-lg
                      prose-strong:text-primary prose-strong:font-semibold
                      prose-ul:list-disc prose-ul:ml-4
                      prose-p:mb-3"
              >
                <ReactMarkdown>{feedback?.feedback?.comment}</ReactMarkdown>
              </div>
              <div className="flex items-center gap-1 mt-10">
                <p>Overall score: </p>

                <FaStar className="text-[#FFD700]" />
                <p className="">{feedback?.feedback?.score}/100</p>
              </div>
            </>
          ) : (
            <div className="">
              <p>There was no enough communication to provide feedback. </p>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Link href={`/practice/interview/${id}`} className=" ">
          {" "}
          <Button className="flex items-center text-white gap-2 bg-blue-700 hover:bg-blue-600">
            Retake Interview <SiGooglegemini />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeedbackCard;
