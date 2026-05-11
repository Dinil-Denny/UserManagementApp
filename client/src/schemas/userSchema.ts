//zod validation schema for admin side 
import * as z from "zod";

//schema for adding new user
export const addUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be under 20 characters"),
  email: z.email("invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    // Use regex to check for capital, number, and special character
    .regex(/[A-Z]/, "Password must contain at least one capital letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  //.regex( /[^a-zA-Z0-9]/, "Password must contain at least one special symbol"),
});
//schema for editing user details
export const editUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be under 20 characters"),
  email: z.email("invalid email address"),
});

export type AddUserInput = z.infer<typeof addUserSchema>;
export type EditUserInput = z.infer<typeof editUserSchema>;
