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

**IMPORTANT RULES:**
- overallScore = weighted average: (keywords×0.30 + formatting×0.15 + experience×0.25 + skills×0.20 + education×0.10)
- estimatedPassRate should be realistic: if overallScore < 60, passRate should be < 50%; if overallScore > 80, passRate should be > 75%
- topImprovements = maximum 5 items, sorted by priority (critical > high > medium)
- Be specific in descriptions: Never say "add keywords" - instead say "add TypeScript, AWS, Docker"
- missing arrays should contain ONLY the top 5 most critical items
- Do not wrap JSON in markdown code blocks
- Do not include any text before or after the JSON object
`,
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

export const optimizeCV = async (
  resumeText: string,
  jobDescription: string,
  atsResponse: any
) => {
  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: `You are an expert resume writer specializing in ATS optimization. Your job is to optimize a resume for a specific job description while maintaining COMPLETE TRUTHFULNESS.

**INPUTS:**
- Original Resume: ${resumeText}
- Job Description: ${jobDescription}
- ATS Analysis Feedback: ${JSON.stringify(atsResponse)}

**YOUR TASK:**
Optimize the resume content to improve ATS score while keeping it 100% truthful. You can ONLY:
1. Rephrase existing experience to better match JD language
2. Suggest where to add metrics with [METRIC_NEEDED] placeholders
3. Reorganize content for better ATS compatibility
4. Suggest improvements the user should make themselves

**CRITICAL RULES - WHAT YOU CANNOT DO:**
 NEVER add skills the user doesn't have
 NEVER fabricate experience, projects, or achievements
 NEVER add certifications or education that don't exist
 NEVER create fake links or contact information
 NEVER add technologies the user hasn't mentioned

**WHAT YOU CAN DO:**
Rephrase "Built web apps" → "Developed and deployed web applications"
Add metric placeholders: "Improved performance [ADD_PERCENTAGE]%"
Reorder skills to prioritize JD matches
Suggest: "Consider adding quantifiable metrics here: [METRIC_NEEDED: team size/users/performance improvement]"
Flag skill gaps: "Missing required skill: AWS - consider learning or removing this JD from targets"

**OPTIMIZATION PRIORITIES:**
1. Rephrase existing experience to use JD terminology
2. Add [METRIC_NEEDED] placeholders where numbers are missing
3. Reorder skills to put JD matches first
4. Suggest where user should add real data
5. Flag genuine skill gaps (don't try to hide them)

**OUTPUT FORMAT:**
Return ONLY valid JSON (no markdown, no explanations outside JSON):

{
  "optimizedResume": {
    "image": null,
    "fullname": "string",
    "title": "string | null",
    "summary": "string | null",
    "email": "string | null",
    "phone": "string | null",
    "location": "string | null",
    "links": {
      "linkedin": "string | null",
      "github": "string | null",
      "portfolio": "string | null"
    },
    "education": [
      {
        "school": "string",
        "degree": "string",
        "startDate": "string",
        "endDate": "string",
        "location": "string"
      }
    ],
    "experience": [
      {
        "company": "string",
        "title": "string",
        "startDate": "string",
        "endDate": "string",
        "location": "string",
        "description": "string"
      }
    ],
    "projects": [
      {
        "title": "string",
        "description": "string",
        "stacks": "string",
        "link": "string | null"
      }
    ],
    "skills": "string",
    "awards": [
      {
        "title": "string",
        "description": "string",
        "year": "string"
      }
    ],
    "languages": [
      {
        "name": "string",
        "level": "beginner | intermediate | advanced"
      }
    ]
  },
  "placeholdersNeeded": [
    {
      "section": "experience",
      "field": "company name - description",
      "placeholder": "[METRIC_NEEDED]",
      "suggestion": "Add percentage improvement, team size, or user count"
    }
  ],
  "skillGaps": [
    {
      "skill": "AWS",
      "priority": "critical",
      "suggestion": "This is a required skill you don't have. Consider learning or targeting different roles."
    }
  ],
  "changesMade": [
    {
      "section": "experience",
      "original": "Built apps",
      "optimized": "Developed and deployed production applications",
      "reason": "Better matches JD terminology"
    }
  ],
  "newEstimatedScore": 85,
  "improvementFromOriginal": 12
}

**EXAMPLE - What to do with missing keywords:**

Original Resume: "Experience with databases"
Job Description requires: "PostgreSQL, MongoDB"

WRONG: Add "PostgreSQL, MongoDB" to skills
RIGHT: 
- If they mentioned databases: "Experience with relational and NoSQL databases [ADD_SPECIFIC: PostgreSQL, MongoDB if applicable]"
- Add to skillGaps: {"skill": "PostgreSQL", "priority": "high", "suggestion": "Required skill not found in resume"}

**SPECIAL INSTRUCTIONS:**
- For links: Only keep if they start with "http", otherwise return null
- For image: Always return null
- For missing sections (awards, projects): Don't fabricate, just flag in skillGaps
- Description fields: Keep newlines for bullet points (use \\n)
- Skills: Return as comma-separated string, prioritize JD matches first
- All dates must remain exactly as they were
- All personal info (name, email, phone) must remain unchanged

Do not include any text before or after the JSON object.
  `,
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
