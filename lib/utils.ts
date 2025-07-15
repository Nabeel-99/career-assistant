import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, format } from "date-fns";
import { devIconsMappings } from "./helper";

import { PracticeWithFeedback } from "./types";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (date: any) => {
  const formattedTime = formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
  return formattedTime;
};

export const getDevIconUrl = (name: string) => {
  const icon = name as keyof typeof devIconsMappings;
  if (icon === "aws") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg";
  }
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${devIconsMappings[icon]}/${devIconsMappings[icon]}-original.svg`;
};

export const cleanJSONparse = (text: string) => {
  const cleaned = text
    .trim()
    .replace(/^```json/, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();

  return JSON.parse(cleaned);
};

export const mapLevel = {
  "entry-level": {
    title: "Entry Level",
    bgColor: "bg-green-600/80 text-white",
  },
  "mid-level": {
    title: "Mid Level",
    bgColor: "bg-yellow-300 text-black",
  },
  "senior-level": {
    title: "Senior Level",
    bgColor: "bg-red-500/80 text-white",
  },
};

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
export function formatTemplateDate(date: string) {
  if (date === "Present") return "Present";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  } catch {
    return date;
  }
}

// Generate 14 past days like "2025-06-25"
const getPastDays = (n: number) => {
  return Array.from({ length: n }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - i - 1));
    return format(d, "yyyy-MM-dd");
  });
};

export const generateChartData = (practices: PracticeWithFeedback[]) => {
  const days = getPastDays(14);

  const chart = days.map((date) => ({
    date,
    practice: 0,
    feedbacks: 0,
  }));

  for (const p of practices) {
    const created = format(new Date(p.createdAt), "yyyy-MM-dd");
    const feedbackCreated = p.feedback
      ? format(new Date(p.feedback.createdAt), "yyyy-MM-dd")
      : null;

    const practiceDay = chart.find((d) => d.date === created);
    if (practiceDay) practiceDay.practice++;

    if (p.isTaken && p.feedback && feedbackCreated) {
      const feedbackDay = chart.find((d) => d.date === feedbackCreated);
      if (feedbackDay) feedbackDay.feedbacks++;
    }
  }

  return chart;
};

export const TIPS = [
  "Upload your resume to get AI-powered improvement suggestions.",
  "Practice mock interviews with voice AI to boost confidence.",
  "Add missing project links before applying templates for a polished CV.",
  "Use clear project titles and tech stacks in your resume.",
  "Apply a modern template to make your CV stand out visually.",
  "Get AI feedback instantly after each interview attempt.",
  "Keep your resume updated with your latest achievements.",
  "Create different resume versions for different job roles.",
  "Don’t leave your social links blank — add GitHub or portfolio links.",
  "Check your activity tab to track recent uploads and interviews.",
];
