import { groq } from "@ai-sdk/groq";
import { cleanJSONparse } from "./utils";
import { generateText } from "ai";

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
- A user's resume (raw text)
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
5. **questions**: Return **3 to 10 realistic interview questions** that simulate what a company might ask *during a real technical interview* for the given role and level. Prioritize questions based on:
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
  console.log("data", data);
  try {
    if (data) {
      const parsed = cleanJSONparse(data);
      console.log("parsed", parsed);
      return parsed;
    }
  } catch (error) {
    console.log("error", error);
    throw new Error("Error parsing JSON");
  }
};
