import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      secureCookie: isProduction,
    });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { messages } = await req.json();
    const metadata = messages.find((m: any) => m.role === "user")?.metadata;
    const { questions, numberOfQuestions, username } = metadata;
    const systemPrompt = `You are an AI interviewer.
You have a list of ${numberOfQuestions} interview questions:
${JSON.stringify(questions)}

Your job:

1. Greet the user warmly by name. Username: ${username}.
2. Ask the user if they are ready for the interview.
3. Wait for the user to respond before asking the next question.
4. Ask **only one question at a time**. Do not reveal any further questions until the user answers the current one.
5. After the user answers, **give brief feedback and a rating from 1-10** on that answer.
6. If needed, you can ask **one follow-up question for clarification**, but **do not move to the next main question until the user answers**.
7. After the final question is answered, summarize the user's overall performance and grade the interview out of 100, and provide improvement tips.

Important rules:
- Never ask multiple main questions in one turn.
- Always wait for the user's response before continuing.
- If the user goes off-topic or delays (e.g., "wait", "hold on"), respond politely and wait.

Keep your responses structured but concise, focusing on one interaction at a time.`;

    const result = streamText({
      model: google("gemma-3-27b-it"),
      system: systemPrompt,
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
