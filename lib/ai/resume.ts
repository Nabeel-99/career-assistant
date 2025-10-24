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

export const analyzeATS = async (
  resumeText: string,
  jobDescription: string
) => {
  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: `You are an expert ATS (Applicant Tracking System) analyzer. Your job is to compare a resume against a job description and provide detailed compatibility feedback.

    **INPUTS:**
    Resume Text:
    ${resumeText}
    
    Job Description:
    ${jobDescription}
    
    **YOUR TASK:**
    Analyze how well this resume matches the job description for ATS compatibility. Focus on:
    
    1. KEYWORD MATCH (30% weight):
       - Extract key technical skills, tools, frameworks from JD
       - Identify which are present vs missing in resume
       - Categorize missing keywords as "critical" (required) vs "nice-to-have" (preferred)
    
    2. FORMATTING (15% weight):
       - Check for ATS-unfriendly elements (tables, columns, images, text boxes)
       - Verify clear section headers (Education, Experience, Skills, etc.)
       - Check for standard date formats
    
    3. EXPERIENCE RELEVANCE (25% weight):
       - Compare years of experience required vs present
       - Check industry/domain alignment
       - Count quantifiable achievements (numbers, %, $, etc.)
       - Identify where metrics are missing
    
    4. SKILLS MATCH (20% weight):
       - Count matched technical skills
       - Identify soft skills present
       - Note missing required skills
    
    5. EDUCATION MATCH (10% weight):
       - Check if education requirement is met
    
    **OUTPUT FORMAT:**
   Return ONLY valid JSON:

{
  "overallScore": <0-100>,
  "estimatedPassRate": <0-100>,
  
  "categoryScores": {
    "keywords": {
      "score": <0-100>,
      "missing": [<top 5 missing critical keywords>]
    },
    "experience": {
      "score": <0-100>,
      "metricsCount": <number of quantifiable achievements found>
    },
    "skills": {
      "score": <0-100>,
      "missing": [<top 5 missing skills>]
    }
  },
  
  "topImprovements": [
    {
      "priority": "critical" | "high" | "medium",
      "title": <short title>,
      "description": <specific action to take>,
    }
  ],
  
}

RULES:
- overallScore = weighted average of category scores
- estimatedPassRate = realistic % (if score < 60, passRate should be < 50%)
- topImprovements = max 5 items, sorted by impact
- Be specific: Instead of "add keywords", say "add TypeScript, AWS, Docker"
`,
  });
};
