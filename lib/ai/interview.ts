"use server";

import { cleanJSONparse } from "../utils";
import { google } from "@ai-sdk/google";
import { generateText, streamText } from "ai";

import { groq } from "@ai-sdk/groq";
import { Transcript } from "../types";
export const generateQuestions = async (
  jobDescription: string,
  userResume: string,
  level: string
) => {
  const { text } = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt: `
  You are an AI system for generating realistic mock interviews.
  
  You will be given:
  - A job description
  - A user's resume (raw text) / or empty resume incase the user just wants to practice without selecting a resume
  - Their experience level (e.g., "entry", "mid", "senior")
  
  Your task is to return a JSON object with the following:
  
  1. **title**: A short title like "Frontend Developer Interview".
  2. **description**: A *one-sentence* summary of this mock interview.
  3. **stacks**: Return the **3 most central tools, technologies, or platforms** that the candidate is most likely to **use hands-on in daily tasks**, based strictly on the job description.
  - Only include tools that are either **explicitly mentioned** or are **clearly central** to performing the job’s core deliverables (e.g., building interfaces, designing visuals, writing content, analyzing data).
  - This applies to **any profession**, not just software developers — such as design, marketing, writing, customer service, etc.
  - Exclude generic or supporting tools like Git, Jira, email, file sharing platforms, or deployment services — unless one is obviously central to the daily work.
  - Format the result as a lowercase array of strings, for example:  
    - Developer: ["react", "typescript", "nextjs"]  
    - Designer: ["figma", "photoshop", "illustrator"]  
    - Marketer: ["google ads", "hubspot", "analytics"]
    and many more
  4. **role**: The likely role being applied for, like "Frontend Developer", "Software Engineer", "Product Desginer" etc.
  5. **questions**: Return **5 realistic interview questions** that simulate what a company might ask *during a real technical interview* for the given role and level. Prioritize questions based on:
      - Technologies mentioned in the job description.
      - Responsibilities or challenges outlined in the job post.
      - DO NOT assume what the user has done unless clearly visible in the resume.
      - You MAY refer to the resume for tailoring tone or depth, but DO NOT invent skills.
  
  
  DO NOT wrap the JSON in backticks, code blocks, or any extra text. Return ONLY the raw JSON object.
  Return the result as **valid JSON** only in this format, matching this exact structure:
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

export const generateFeedback = async (transcript: Transcript[]) => {
  const { text } = await generateText({
    model: google("gemini-2.5-pro"),

    prompt: `You are an AI interview evaluator for a tech company.
  
    You will be given a transcript of a mock interview between an AI interviewer and a candidate.
    
    Your task is to evaluate the candidate's performance as if you are a professional hiring manager.
    
    ---
    
    ### TRANSCRIPT:
    ${transcript
      .map((t) => `${t.role === "user" ? "USER" : "AI"}: ${t.text}`)
      .join("\n")}
    
    ---
    
    ### EVALUATION CRITERIA:
    
    1. **Communication & Clarity (20 points)**  
       - Did the candidate communicate their thoughts clearly?
       - Did they avoid filler words and stay on-topic?
       - Was their tone confident and structured?
    
    2. **Technical Knowledge & Accuracy (30 points)**  
       - Did their responses reflect sound technical understanding?
       - Were they able to explain technical topics correctly?
       - Did they demonstrate relevant experience or solutions?
    
    3. **Problem-Solving Ability (15 points)**  
       - Did they show logical thinking or creativity in problem-solving?
       - Did they break down complex questions effectively?
    
    4. **Relevance to Role & Experience (15 points)**  
       - Did their experience and answers align with what is expected for the role?
       - Do their examples show practical knowledge and real-world application?
    
    5. **Behavioral Insight & Soft Skills (10 points)**  
       - Did they show good interpersonal skills, motivation, or leadership?
       - Did they reflect a growth mindset or adaptability?
    
    6. **Overall Impression & Fit for Role (10 points)**  
       - Based on all the above, would you recommend them for the next stage?
    
    ---
    
    ### CRITICAL OUTPUT INSTRUCTIONS:
    
    You MUST return ONLY a valid JSON object. NO markdown, NO code blocks, NO extra text.
    
    The JSON must have this EXACT structure:
    
    {
      "totalScore": 85,
      "comment": "Your complete feedback as ONE continuous string goes here. Include section scores, verdict, and detailed feedback ALL in this single string field. Use \\n for line breaks within the string."
    }
    
    **IMPORTANT:**
    - totalScore: Must be a number (0-100)
    - comment: Must be a SINGLE STRING (not an object, not nested fields)
    - In the comment string, include:
      * Section scores (e.g., "Communication & Clarity: 15/20\\n...")
      * Verdict (✅ Strong / ⚠️ Moderate / ❌ Weak)
      * Detailed personal feedback addressed to "you" (the candidate)
      * Specific strengths and actionable improvement suggestions
    
    **Example of correct format:**
    
    {
      "totalScore": 75,
      "comment": "**Section Scores:**\\nCommunication & Clarity: 15/20\\nTechnical Knowledge & Accuracy: 22/30\\nProblem-Solving Ability: 10/15\\nRelevance to Role & Experience: 11/15\\nBehavioral Insight & Soft Skills: 8/10\\nOverall Impression & Fit: 7/10\\n\\n**Verdict:** ⚠️ Moderate – Could improve in some areas\\n\\n**Feedback:**\\nThank you for taking the time to interview with us. You demonstrated solid understanding of React fundamentals and showed enthusiasm for the role..."
    }
    
    Do NOT return the comment field as a nested object. Everything must be in ONE STRING.
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
