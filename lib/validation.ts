import { z } from "zod";
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]).{8,}$/;

const strongPassword = z.string().regex(passwordRegex, {
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
