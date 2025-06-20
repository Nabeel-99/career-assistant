import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (date: any) => {
  const formattedTime = formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
  return formattedTime;
};
