"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { cleanJSONparse } from "../utils";

export const generateCV = async (rawText: string) => {
  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: `You are an intelligent resume parsing assistant.
  Your task is to analyze the raw resume text below and extract its content into structured JSON format following the exact schema provided.
  Make sure the output can be parsed with JSON.parse(). Do not include markdown or extra text outside the JSON. Every field must match the types and structure of the schema.
  
  If a value is missing in the text, return:
  - null for optional single fields (e.g., title, email, location, etc.)
  - [] for missing arrays (e.g., skills, projects, languages, etc.)
  
  **Special rules:**
  - For "image", always return null (as it's not in the raw text).
  - For links (e.g., LinkedIn, GitHub, portfolio, or project links), only return them if they start with "http". Otherwise, return null.
  - Do not guess or fill placeholders.
  - Do not return markdown, explanations, or any text outside the JSON object.
  
  Return the final result as a valid JSON object matching this schema:
  
  {
    image: string | null,
    fullname: string,
    title: string | null,
    summary: string | null,
  
    email: string | null,
    phone: string | null,
    location: string | null,
  
    links: {
      linkedin?: string | null,
      github?: string | null,
      portfolio?: string | null
    },
  
    education: {
      school: string,
      degree: string,
      startDate: string,
      endDate: string,
      location: string
    }[],
  
    experience: {
      company: string,
      title: string,
      startDate: string,
      endDate: string,
      location: string,
      description: string
    }[],
  
    projects?: {
      title: string,
      description: string,
      stacks: string,
      link: string | null
    }[],
  
    skills: string,
  
    awards?: {
      title: string,
      description: string,
      year: string
    }[],
  
    languages: {
      name: string,
      level: "beginner" | "intermediate" | "advanced"
    }[]
  }
  
  If the raw text is not a resume, return an empty object: {}.
  
  Now extract the resume from the text below:
  
  ${rawText}`,
  });
  const data = text;
  try {
    if (data) {
      const parsed = cleanJSONparse(data);
      return parsed;
    }
  } catch (error) {
    throw new Error("Error parsing JSON");
  }
};
