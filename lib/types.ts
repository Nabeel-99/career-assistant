import { Prisma } from "./generated/prisma";

export type ResumeProps = {
  name: string;
  createdAt?: string;
  filePath?: string;
};

export type Transcript = {
  role: string;
  text: string;
};

export type PracticeWithFeedback = Prisma.PracticeGetPayload<{
  include: {
    questions: true;
    feedback: true;
  };
}>;

export type ActivityData = {
  date: string;
  practice: number;
  feedbacks: number;
};

export type Template = {
  image: string;
  name: string;
  title: string;
  description: string;
};
