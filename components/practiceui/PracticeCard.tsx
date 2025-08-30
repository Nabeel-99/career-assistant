"use client";

import React, { useState } from "react";
import { FaRegCalendarAlt, FaTrash } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDate, getDevIconUrl, mapLevel } from "@/lib/utils";
import Link from "next/link";
import { PracticeWithFeedback } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { deletePractice } from "@/lib/action";
import { toast } from "sonner";
import { DeleteDialog } from "./DeleteDialog";

type PracticeCardProps = PracticeWithFeedback & {
  getUserPractices: () => void;
};
const PracticeCard = ({
  id,
  title,
  description,
  stacks,
  level,
  createdAt,
  isTaken,
  feedback,
  getUserPractices,
}: PracticeCardProps) => {
  const expLevel = level as keyof typeof mapLevel;

  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeletePractice = async () => {
    try {
      setDeleteLoading(true);
      const res = await deletePractice(id);
      if (res.success) {
        getUserPractices();

        toast.success("Deleted successfully");
        setShowDelete(false);
      } else {
        toast.error("Error deleting practice");
      }
    } catch (error) {
      toast.error("Error deleting practice");
    } finally {
      setDeleteLoading(false);
    }
  };
  const showDeleteDialog = () => {
    setShowDelete(true);
  };
  return (
    <div className="flex flex-col border rounded-lg p-4 xl:h-[400px] dark:bg-[#0a0a0a]/30">
      <div className="border rounded-lg p-4 overflow-clip flex items-center justify-center">
        <div className=" *:data-[slot=avatar]:ring-[#c3c3c3] dark:*:data-[slot=avatar]:ring-[#4b4b4b]  flex -space-x-8 *:data-[slot=avatar]:ring-2 ">
          {stacks.map((stack, index) => (
            <Avatar className="size-20 xl:size-28" key={index}>
              <AvatarImage
                src={getDevIconUrl(stack)}
                alt={stack}
                className="backdrop-blur-lg rounded-full bg-white/40"
              />
              <AvatarFallback>{stack}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between text-sm h-full">
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-base font-bold">{title}</p>
          <p className="line-clamp-3">{description}</p>
          <div className="flex items-center gap-10 text-sm">
            <div className="flex items-center gap-1">
              <FaRegCalendarAlt className="text-black/60 text-subheadline" />
              <p className="text-nowrap">{formatDate(createdAt)}</p>
            </div>
            <div className="flex items-center gap-1">
              <FaStar className="text-[#FFD700]" />
              <p className="">{feedback ? feedback.score : 0}/100</p>
            </div>
          </div>
        </div>
        {!isTaken ? (
          <div className="mt-2 mb-2">
            <p className="text-sm text-subheadline">
              {" "}
              You have not taken this practice yet
            </p>
          </div>
        ) : (
          <div className="mt-2">
            <p className="text-sm text-subheadline">
              {" "}
              You have taken this practice
            </p>
          </div>
        )}

        <div className="flex items-center   mt-6 xl:mt-0 justify-between">
          <p
            className={`border px-3 py-2 rounded-xl ${mapLevel[expLevel].bgColor}`}
          >
            {mapLevel[expLevel].title}
          </p>
          <div className="flex items-center gap-1">
            {isTaken ? (
              <Link href={`/practice/feedback/${id}`} className="  ">
                {" "}
                <Button>View Feedback</Button>
              </Link>
            ) : (
              <Link href={`/practice/interview/${id}`} className="  ">
                {" "}
                <Button>Start Interview</Button>
              </Link>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={showDeleteDialog}>
                  <FaTrash />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Practice</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
      {/* show Delete Dialog */}
      <DeleteDialog
        deleteLoading={deleteLoading}
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        action={handleDeletePractice}
      />
    </div>
  );
};

export default PracticeCard;
