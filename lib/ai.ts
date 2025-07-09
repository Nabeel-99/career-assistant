import { groq } from "@ai-sdk/groq";
import { cleanJSONparse } from "./utils";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { Transcript } from "./types";

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

  try {
    if (data) {
      const parsed = cleanJSONparse(data);

      return parsed;
    }
  } catch (error) {
    console.log("error", error);
    throw new Error("Error parsing JSON");
  }
};

export const generateFeedback = async (transcript: Transcript[]) => {
  const { text } = await generateText({
    model: groq("llama-3.1-8b-instant"),

    prompt: `You are an AI interview evaluator for a tech company.

You will be given a transcript of a mock interview between an AI interviewer and a candidate.

Your task is to evaluate the candidate's performance as if you are a professional hiring manager. Be objective, insightful, and detailed.

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

### OUTPUT FORMAT:

1. **Section Scores**  
   - Communication & Clarity: __ / 20  
   - Technical Knowledge & Accuracy: __ / 30  
   - Problem-Solving Ability: __ / 15  
   - Relevance to Role & Experience: __ / 15  
   - Behavioral Insight & Soft Skills: __ / 10  
   - Overall Impression & Fit: __ / 10

2. **Total Score**  
   - __ / 100

3. **Verdict**  
   - ✅ Strong candidate – Recommend for next stage  
   - ⚠️ Moderate – Could improve in some areas  
   - ❌ Weak – Not recommended based on this interview

4. **Feedback Summary**  
Write a detailed, constructive, and well-organized paragraph of feedback **addressed directly to the candidate**. Use "you" instead of "the candidate". This is personal feedback.
- Clearly highlight the candidate's strengths.  
- Point out specific areas for improvement.  
- Offer actionable suggestions to help them do better in future interviews.  
Avoid being vague or generic. Be specific and professional.
---

### TONE:
Be honest, balanced, and professional. Avoid overly generic responses.

---

Return the final output as a valid JSON object with the following shape:

{
  "totalScore": number,
  "comment": "Full feedback summary..."
}

Make sure the output can be parsed with JSON.parse(). Do not include markdown or extra text outside the JSON.
`,
  });
  const data = text;

  try {
    if (data) {
      const parsed = cleanJSONparse(data);

      return parsed;
    }
  } catch (error) {
    console.log("error", error);
    throw new Error("Error parsing JSON");
  }
};

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

  skills: string[],

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
    console.log("error", error);
    throw new Error("Error parsing JSON");
  }
};
