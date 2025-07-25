"use client";

import React, { useEffect, useState } from "react";
import { Prisma } from "@/lib/generated/prisma";
import { createFeedback, fetchPracticeById } from "@/lib/action";
import { assistant, vapi } from "@/lib/vapi";
import InterviewContainer from "./InterviewContainer";
import { Transcript } from "@/lib/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CallCardSkeleton from "../skeletons/CallCardSkeleton";

type UserWithResume = Prisma.UserGetPayload<{
  include: {
    resumes: true;
  };
}>;
type PracticeWithQuestions = Prisma.PracticeGetPayload<{
  include: { questions: true };
}>;

const CallCard = ({
  user,
  id,
}: {
  user: UserWithResume | null;
  id: string;
}) => {
  const [practice, setPractice] = useState<PracticeWithQuestions | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formattedQuestions = practice?.questions
    .map((q, i) => `${i + 1}. ${q.question}`)
    .join("\n");
  const [timeLeft, setTimeLeft] = useState(600);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<Transcript[]>([]);
  const [starting, setStarting] = useState(false);
  const [lastMessage, setLastMessage] = useState<Transcript | null>(null);
  const [generatingFeedback, setGeneratingFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<
    "redirecting" | "generating"
  >("generating");
  const fetchInterview = async () => {
    try {
      setLoading(true);
      const res = await fetchPracticeById(id);

      setPractice(res);
    } catch (error) {
      toast.error("Error fetching interview");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterview();
  }, []);

  useEffect(() => {
    vapi.on("call-start", () => {
      setIsConnected(true);
    });
    vapi.on("call-end", () => {
      setIsConnected(false);
      setIsSpeaking(false);
    });
    vapi.on("speech-start", () => {
      setIsSpeaking(true);
    });
    vapi.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role,
            text: message.transcript,
          },
        ]);
      }
    });

    vapi.on("error", (error) => {
      toast.error(error.message);
    });

    return () => {
      vapi.stop();
    };
  }, []);
  useEffect(() => {
    if (!isConnected && transcript.length >= 4 && !generatingFeedback) {
      const runFeedback = async () => {
        try {
          setGeneratingFeedback(true);
          setFeedbackMessage("generating");
          const res = await createFeedback(transcript, id);
          if (res.success) {
            toast.success(res.message);
            setFeedbackMessage("redirecting");
            router.push(`/practice/feedback/${id}`);
          } else {
            toast.error(res.message);
            setGeneratingFeedback(false);
          }
        } catch (error) {
          toast.error("Error creating feedback");
          setGeneratingFeedback(false);
        }
      };
      runFeedback();
    }
  }, [isConnected, transcript.length]);

  useEffect(() => {
    if (!isConnected) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isConnected]);
  useEffect(() => {
    if (transcript.length > 0) {
      setLastMessage(transcript[transcript.length - 1]);
    }
  }, [transcript]);

  const startCall = async () => {
    try {
      setStarting(true);
      await vapi.start(
        assistant(
          user?.firstname!,
          formattedQuestions!,
          practice?.role!,
          practice?.resumeText!
        )
      );
    } catch (error) {
      toast.error("Error starting call");
    } finally {
      setStarting(false);
    }
  };

  const endCall = () => {
    vapi.stop();
  };
  return (
    <div className="flex flex-col  justify-between xl:flex-row gap-10 h-full w-full">
      {loading ? (
        <CallCardSkeleton />
      ) : (
        <>
          <InterviewContainer
            practice={practice}
            isSpeaking={isSpeaking}
            user={user}
            feedbackMessage={feedbackMessage}
            isConnected={isConnected}
            lastMessage={lastMessage}
            transcript={transcript}
            starting={starting}
            generatingFeedback={generatingFeedback}
            startCall={startCall}
            endCall={endCall}
            timeLeft={timeLeft}
          />
        </>
      )}
    </div>
  );
};

export default CallCard;
