import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { BsFillLightbulbFill } from "react-icons/bs";
import { ATSFeedback } from "@/lib/types";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";

type ATSFeedbackProps = {
  result: ATSFeedback | null;
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-yellow-500";
  return "text-red-500";
};

const getPriorityBadge = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "critical":
      return {
        bg: "bg-red-500/10 border-red-500/30",
        text: "text-red-600 dark:text-red-400",
        icon: <AlertCircle className="w-4 h-4" />,
      };
    case "high":
      return {
        bg: "bg-orange-500/10 border-orange-500/30",
        text: "text-orange-600 dark:text-orange-400",
        icon: <AlertTriangle className="w-4 h-4" />,
      };
    case "medium":
      return {
        bg: "bg-yellow-500/10 border-yellow-500/30",
        text: "text-yellow-600 dark:text-yellow-400",
        icon: <AlertTriangle className="w-4 h-4" />,
      };
    default:
      return {
        bg: "bg-blue-500/10 border-blue-500/30",
        text: "text-blue-600 dark:text-blue-400",
        icon: <CheckCircle2 className="w-4 h-4" />,
      };
  }
};
const AtsFeedback = ({ result }: ATSFeedbackProps) => {
  return (
    <CardContent className="flex flex-col gap-4">
      <Card className="flex flex-col gap-4 p-4 dark:bg-[#1A1A1A]">
        <p className="font-bold">Result</p>
        <p className="flex items-center justify-between">
          ATS Score{" "}
          <span
            className={cn("font-black", getScoreColor(result?.overallScore!))}
          >
            {result?.overallScore}%
          </span>{" "}
        </p>
        <p className="flex items-center justify-between">
          Estimated Pass Rate{" "}
          <span
            className={cn(
              "font-black",
              getScoreColor(result?.estimatedPassRate!)
            )}
          >
            {result?.estimatedPassRate}%
          </span>{" "}
        </p>
      </Card>
      <Card className="flex flex-col gap-4 p-4 dark:bg-[#1A1A1A]">
        <p className="font-bold">Category Breakdown</p>
        <p className="flex items-center justify-between">
          Experience{" "}
          <span
            className={cn(
              "font-black",
              getScoreColor(result?.categoryScores.experience.score!)
            )}
          >
            {result?.categoryScores.experience.score}%
          </span>{" "}
        </p>
        <p className="flex items-center justify-between">
          Keywords{" "}
          <span
            className={cn(
              "font-black",
              getScoreColor(result?.categoryScores.keywords.score!)
            )}
          >
            {result?.categoryScores.keywords.score}%
          </span>{" "}
        </p>
        <p className="flex items-center justify-between">
          Skills{" "}
          <span
            className={cn(
              "font-black",
              getScoreColor(result?.categoryScores.skills.score!)
            )}
          >
            {result?.categoryScores.skills.score}%
          </span>{" "}
        </p>
      </Card>
      <Card className="flex flex-col gap-4 p-4 dark:bg-[#1A1A1A]">
        <p className="font-bold">Top Improvements</p>

        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-3"
          // defaultValue="item-1"
        >
          {result?.topImprovements.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="border p-1 px-4 rounded-lg"
            >
              <AccordionTrigger className="">{item.title}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <div className="flex items-start gap-2">
                  <span className="flex flex-col items-center gap-2">
                    <BsFillLightbulbFill className="size-4 mt-1" />
                  </span>
                  <div className="flex flex-col items-start gap-2">
                    <p> {item.description}</p>

                    <span
                      className={cn(
                        "border p-1 rounded-md flex gap-1 items-center",
                        getPriorityBadge(item.priority).bg,
                        getPriorityBadge(item.priority).text
                      )}
                    >
                      {item.priority}
                      {getPriorityBadge(item.priority).icon}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </CardContent>
  );
};

export default AtsFeedback;
