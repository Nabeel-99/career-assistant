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
  fullname: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),

  email: z.string().email(),
  phone: z.string().min(1),
  location: z.string().min(1),

  links: z
    .object({
      linkedin: z.string().optional().nullable(),
      github: z.string().optional().nullable(),
      portfolio: z.string().optional().nullable(),
    })
    .optional(),

  education: z.array(
    z.object({
      school: z.string().min(1),
      degree: z.string().min(1),
      startDate: z.string().min(1),
      endDate: z.string().min(1),
      location: z.string().min(1),
    })
  ),

  experience: z.array(
    z.object({
      company: z.string().min(1),
      title: z.string().min(1),
      startDate: z.string().min(1),
      endDate: z.string().min(1),
      location: z.string().min(1),
      description: z.array(z.string().min(1)),
    })
  ),

  projects: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        stacks: z.string().min(1),
        link: z.string().min(1),
      })
    )
    .optional(),

  skills: z.array(z.string().min(1)),

  awards: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        year: z.string().min(1),
      })
    )
    .optional(),
});
