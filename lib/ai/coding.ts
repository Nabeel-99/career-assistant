"use server";

import { google } from "@ai-sdk/google";
import { createStreamableValue } from "@ai-sdk/rsc";
import { generateText, streamText } from "ai";
import { cleanJSONparse } from "../utils";

export const generateCodingTask = async (
  stacks: string[],
  level: string,
  previousQuestions?: string[]
) => {
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = streamText({
      model: google("gemma-3-27b-it"),
      prompt: `Create ONE realistic coding interview question for a ${level} level ${stacks.join(
        ", "
      )} developer.
       
  Do NOT repeat questions that you have generated previously. 
  
   Previous questions: ${previousQuestions?.join("\n")}.
   Make sure this question is unique and does not closely resemble any of the above previous questions IF PROVIDED.
  The question should focus ONLY on ${stacks.join(
    ", "
  )} skills appropriate for the selected level.
  
  Format your output exactly like this:
  
  # Title
  (A short descriptive title, e.g., "Two Sum" or "Filterable List")
  
  **Description**  
  (One sentence describing what the problem or task is)
  
  **Problem Statement**  
  (Describe the task clearly. For algorithmic tasks, provide inputs/outputs. For styling/UI tasks, describe the required appearance/behavior. Include example data if needed.)
  
  Example:
  Input: [example input]
  
  **Expected Output**  
  - For algorithmic or SQL tasks: provide the exact result/output for the example, formatted as a proper Markdown table for SQL or a code block for JS.
  - For CSS/HTML tasks: show a simplified representation of what the output should look like for the question using dots and dashes (".", "|", "-").
  - For React/frontend components: show a simplified representation of the rendered DOM for the example inputs and user interaction.  
  
  Ensure that tables are generated using Markdown table syntax ("|" and "-") so they render properly in Markdown and ReactMarkdown.
  `,
    });

    let fullText = "";
    for await (const delta of textStream) {
      fullText += delta;
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
};

export const extractJSONFromText = async (fullText: string) => {
  const { text } = await generateText({
    model: google("gemini-2.5-pro"),
    prompt: `You are an AI system for extracting JSON from text.
        From the following coding question, extract structured JSON:
  
  ===QUESTION===
  ${fullText}
  ===END===
  
  Return only valid JSON like this:
  {
    "hint": "short hint for solving",
    "keywords": "keyword for this question or short one sentence summary of the question"
  }
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
