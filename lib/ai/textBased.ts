"use server";

import { google } from "@ai-sdk/google";
import { createStreamableValue } from "@ai-sdk/rsc";
import { streamText, type UIMessage } from "ai";

export const TextAI = async (
  questions: string[],
  numberOfQuestions: number,
  username: string
) => {
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = streamText({
      model: google("gemma-3-27b-it"),
      prompt: `
      You are an AI interviewer. 
      You have a list of ${numberOfQuestions} interview questions:
      ${JSON.stringify(questions)}
      
      Your job:
      1. Greet the user warmly by name. username: ${username}
      2. Ask if they are ready.
      3. Wait for the user to respond before asking the next question.
      4. Ask one question at a time, never reveal all questions at once.
      5. After each answer, briefly comment and rate it from 1-10.
      6. Then continue to the next question.
      7. After the final question, summarize the performance overall.
      
      If the user goes off-topic or delays (e.g., "wait", "hold on"), respond politely and wait.
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
