import { GoogleGenAI } from "@google/genai";

const GEMINIAI = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

export const generateQuestions = async (
  jobDescription: string,
  userResume: string,
  level: string
) => {
  const response = await GEMINIAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an AI system for generating realistic mock interviews.

You will be given:
- A job description
- A user's resume (raw text)
- Their experience level (e.g., "entry", "mid", "senior")

Your task is to return a JSON object with the following:

1. **title**: A short title like "Frontend Developer Interview".
2. **description**: A *one-sentence* summary of this mock interview.
3. **stacks**: Return only the **5 most relevant** technologies or tools *mentioned prominently* in the job description. Focus on frontend stacks if applicable. Format as an array of lowercase strings, e.g., ["react", "typescript", "nextjs"].
4. **role**: The likely role being applied for, like "Frontend Developer".
5. **questions**: Return **3 to 10 realistic interview questions** that simulate what a company might ask *during a real technical interview* for the given role and level. Prioritize questions based on:
    - Technologies mentioned in the job description.
    - Responsibilities or challenges outlined in the job post.
    - DO NOT assume what the user has done unless clearly visible in the resume.
    - You MAY refer to the resume for tailoring tone or depth, but DO NOT invent skills.

Return the result as **valid JSON** only in this format:

{
  "title": "string",
  "description": "string (1 sentence)",
  "stacks": ["string", "string", ...],
  "role": "string",
  "questions": ["string", "string", ...]
}

Here is the job description:
${jobDescription}

Here is the resume:
${userResume}

Here is the experience level:
${level}
`,
  });

  const data = response.text;
  if (data) {
    const parsed = JSON.parse(data);
    return parsed;
  }
};
