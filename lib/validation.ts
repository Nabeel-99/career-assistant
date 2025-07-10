import { z } from "zod";
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]).{8,}$/;

export const strongPassword = z.string().regex(passwordRegex, {
  message:
    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
});
export const SignUpSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  password: strongPassword,
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: strongPassword,
});

export const PracticeSchema = z.object({
  jobDescription: z.string().min(1),
  resume: z.string().optional(),
  experienceLevel: z.enum(["entry-level", "mid-level", "senior-level"], {
    required_error: "Please select an experience level",
  }),
});

export const updateProfileSchema = z.object({
  image: z.string().optional(),
  firstname: z.string().min(1).optional(),
  lastname: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: strongPassword.optional(),
  currentPassword: z.string().min(1).optional(),
});

export const resumeSchema = z.object({
  image: z.any().optional(),
  fullname: z.string().min(1),
  title: z.string().optional(),
  summary: z.string().optional(),

  email: z.string().email().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),

  links: z
    .object({
      linkedin: z.string().optional(),
      github: z.string().optional(),
      portfolio: z.string().optional(),
    })
    .optional(),

  education: z
    .array(
      z
        .object({
          school: z.string().min(1),
          degree: z.string().min(1),
          startDate: z.string().min(1),
          endDate: z.union([z.string().min(1), z.literal("Present")]),
          location: z.string().min(1),
        })
        .optional()
    )
    .optional(),

  experience: z
    .array(
      z
        .object({
          company: z.string().min(1),
          title: z.string().min(1),
          startDate: z.string().min(1),
          endDate: z.union([z.string().min(1), z.literal("Present")]),
          location: z.string().min(1),
          description: z.string().min(1),
          currentlyWorking: z.boolean().optional(),
        })
        .optional()
    )
    .optional(),

  projects: z
    .array(
      z
        .object({
          title: z.string().min(1),
          description: z.string().min(1),
          stacks: z.string().min(1),
          link: z.string().min(1),
        })
        .optional()
    )
    .optional(),

  skills: z.string().min(1).optional(),
  languages: z
    .array(
      z.object({
        name: z.string(),
        level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
      })
    )
    .optional(),
  awards: z
    .array(
      z
        .object({
          title: z.string().optional(),
          description: z.string().optional(),
          year: z.string().optional(),
        })
        .optional()
    )
    .optional(),
});
