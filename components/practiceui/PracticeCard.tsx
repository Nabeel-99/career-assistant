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

import { toast } from "sonner";
import { DeleteDialog } from "./DeleteDialog";
import { SiGooglegemini } from "react-icons/si";
import { RiChatVoiceAiLine } from "react-icons/ri";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { deletePractice } from "@/lib/actions/practice";
type PracticeCardProps = PracticeWithFeedback & {
  getUserPractices: () => void;
  betaUser?: boolean;
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
  betaUser,
}: PracticeCardProps) => {
  const expLevel = level as keyof typeof mapLevel;

  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showBetaModal, setShowBetaModal] = useState(false);
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
          <div className="flex items-start">
            <p
              className={`border  text-sm px-2 rounded-md ${mapLevel[expLevel].bgColor}`}
            >
              {mapLevel[expLevel].title}
            </p>
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
          <Link href={`/practice/chat/${id}`}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="flex items-center gap-2">
                  Chat AI <RiChatVoiceAiLine />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chat with AI in real time.</p>
              </TooltipContent>
            </Tooltip>
          </Link>

          <div className="flex items-center gap-1">
            {isTaken ? (
              <Link href={`/practice/feedback/${id}`} className="  ">
                {" "}
                <Button>View Feedback</Button>
              </Link>
            ) : betaUser ? (
              <Link href={`/practice/interview/${id}`}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="flex items-center text-white gap-2 bg-blue-700 hover:bg-blue-600">
                      Voice AI <SiGooglegemini /> (Beta)
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Practice with real-time voice conversation.</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
            ) : (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => setShowBetaModal(true)}
                      className="flex items-center text-white gap-2 bg-blue-700 hover:bg-blue-600"
                    >
                      Voice AI <SiGooglegemini /> (Beta)
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Request beta access</p>
                  </TooltipContent>
                </Tooltip>

                <Dialog open={showBetaModal} onOpenChange={setShowBetaModal}>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Beta Access Required</DialogTitle>
                      <DialogDescription>
                        Voice AI is currently in beta testing. Want early
                        access?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                      <p className="text-sm text-muted-foreground">
                        DM or comment on Twitter/X to request beta access and be
                        among the first to try our AI voice interview feature.
                      </p>
                      <Button
                        onClick={() =>
                          window.open("https://x.com/ndev_99", "_blank")
                        }
                        className="w-full"
                      >
                        Request Beta Access on Twitter
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
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
