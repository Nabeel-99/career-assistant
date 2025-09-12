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
import { Dialog } from "../ui/dialog";
import { Card } from "../ui/card";
import { ImSpinner9 } from "react-icons/im";
import UpgradeModal from "./UpgradeModal";

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
  const [showModal, setShowModal] = useState(false);
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
  const [callDetails, setCallDetails] = useState<any[]>([]);
  const fetchInterview = async () => {
    try {
      setLoading(true);
      const res = await fetchPracticeById(id);
      setPractice(res);

      // Fetch call details for this practice
      if (res) {
        const response = await fetch(`/api/call-details?practiceId=${res.id}`);
        const data = await response.json();
        if (data.success) {
          setCallDetails(data.calls);
          console.log("📞 Call details loaded:", data.calls);
        }
      }
    } catch (error) {
      toast.error("Error fetching interview");
    } finally {
      setLoading(false);
    }
  };

  const fetchCallDetails = async () => {
    try {
      if (practice?.id) {
        const response = await fetch(
          `/api/call-details?practiceId=${practice.id}`
        );
        const data = await response.json();
        if (data.success) {
          setCallDetails(data.calls);
          console.log("📞 Call details refreshed:", data.calls);
        }
      }
    } catch (error) {
      console.error("Error fetching call details:", error);
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

      // Refresh call details after call ends
      setTimeout(() => {
        fetchCallDetails();
      }, 3000); // Wait for webhook to process
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

    vapi.on("error", (error: any) => {
      console.log("VAPI Error:", error);
      const resError = error?.error?.error;
      if (resError.statusCode === 400) {
        toast(
          "Ops! Your AI credits has finished. Please purchase more credits or upgrade your plan.",
          {
            action: {
              label: "Upgrade plan",
              onClick: () => {
                setShowModal(true);
              },
            },
          }
        );
      } else {
        toast.error("Something went wrong! Please try again later.");
      }
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
    } catch (error: any) {
      console.log("Start call error:", error);
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

          {/* Call Details Display */}
          {callDetails.length > 0 && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">📞 Call History</h3>
              {callDetails.map((call, index) => (
                <div
                  key={call.vapiCallId || index}
                  className="text-sm space-y-1 mb-3 p-2 bg-white rounded"
                >
                  <p>
                    <strong>Duration:</strong>{" "}
                    {call.duration
                      ? `${Math.floor(call.duration / 60)}m ${
                          call.duration % 60
                        }s`
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Cost:</strong>{" "}
                    {call.cost ? `$${call.cost.toFixed(4)}` : "N/A"}
                  </p>
                  <p>
                    <strong>Ended:</strong> {call.endedReason || "N/A"}
                  </p>
                  {call.startedAt && (
                    <p>
                      <strong>Started:</strong>{" "}
                      {new Date(call.startedAt).toLocaleString()}
                    </p>
                  )}
                  {call.transcript && (
                    <p>
                      <strong>Transcript:</strong>{" "}
                      {call.transcript.substring(0, 100)}...
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {!user ? (
            <Dialog open={showModal} onOpenChange={setShowModal}>
              <Card>
                <ImSpinner9 className="animate-spin" />
              </Card>
            </Dialog>
          ) : (
            showModal &&
            user && (
              <UpgradeModal
                showModal={showModal}
                setShowModal={setShowModal}
                user={user}
              />
            )
          )}
        </>
      )}
    </div>
  );
};

export default CallCard;
