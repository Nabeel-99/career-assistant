import { Prisma } from "./generated/prisma";

export type ResumeProps = {
  id?: number;
  name: string;
  createdAt?: string;
  filePath?: string;
  rawText?: string;
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

export type ATSFeedback = {
  overallScore: number;
  estimatedPassRate: number;
  categoryScores: {
    keywords: {
      score: number;
      missing: string[];
    };
    experience: {
      score: number;
      metricsCount: number;
    };
    skills: {
      score: number;
      missing: string[];
    };
  };
  topImprovements: [
    {
      priority: "critical" | "high" | "medium";
      title: string;
      description: string;
    }
  ];
};
