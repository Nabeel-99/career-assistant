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
