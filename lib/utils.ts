import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";
import { devIconsMappings } from "./helper";
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
