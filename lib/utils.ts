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

export const formatTimer = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
};
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
  "Generate a new resume from scratch using AI — just describe your experience.",
  "Improve your CV content instantly by applying AI-enhanced suggestions.",
  "Highlight your achievements using action verbs for better impact.",
  "Use voice interview feedback to refine your speaking clarity and confidence.",
  "Export your resume in multiple formats after applying a template.",
  "Choose a template that matches the job role you're applying for.",
  "Your resume preview reflects your latest edits — double-check before exporting.",
  "Structured resume data helps AI give better career advice — fill all fields.",
  "Missing awards or certifications? Add them to make your resume stronger.",
  "You can edit AI-generated resumes anytime — customize them to fit your goals.",
  "Track your interview progress and resume changes in your dashboard.",
  "Practice interviews regularly — feedback improves with every session.",
  "Apply a clean design if you're applying for traditional roles; use modern ones for startups.",
  "Don’t forget to add your phone and email — recruiters need a way to reach you.",
  "Update your resume every time you finish a new project or earn a new skill.",
];

// cropImage.ts
export interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // to avoid CORS issues
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.src = url;
  });
}

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCrop,
  rotation = 0
): Promise<HTMLCanvasElement> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Could not get canvas context");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(
    image,
    safeArea / 2 - image.width / 2,
    safeArea / 2 - image.height / 2
  );

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    0 - safeArea / 2 + image.width / 2 - pixelCrop.x,
    0 - safeArea / 2 + image.height / 2 - pixelCrop.y
  );

  return canvas;
}

export const generateDownload = async (
  imageSrc: string,
  crop: PixelCrop
): Promise<void> => {
  if (!crop || !imageSrc) return;

  const canvas = await getCroppedImg(imageSrc, crop);
  canvas.toBlob(
    (blob) => {
      if (!blob) return;

      const previewUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.download = "cropped-image.jpeg";
      anchor.href = previewUrl;
      anchor.click();
      window.URL.revokeObjectURL(previewUrl);
    },
    "image/jpeg",
    0.9
  );
};

export const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};
