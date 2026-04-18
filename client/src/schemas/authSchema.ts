import * as z from "zod";

// This Zod schema ensures the data is strictly typed and validated. So catch errors BEFORE they reach your backend.

//user registration data validation schema
export const registerUserSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      // Use regex to check for capital, number, and special character
      .regex(/[A-Z]/, "Password must contain at least one capital letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special symbol",
      ),
    confirmPassword: z
      .string()
      .regex(/[A-Z]/, "Password must contain at least one capital letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special symbol",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: `Passwords don't match`,
    path: ["confirmPassword"],
  });

//user login data validation schema
export const loginUserSchema = z.object({
  email: z.email("invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    // Use regex to check for capital, number, and special character
    .regex(/[A-Z]/, "Password must contain at least one capital letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special symbol"),
});

// We infer the types directly from the schemas, ensuring a Single Source of Truth.

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
