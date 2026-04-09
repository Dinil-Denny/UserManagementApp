import * as z from "zod";

//user registration data validation schema
const RegisterUserSchema = z.object({
    username : z.string().min(3,'Username must be at least 3 characters'),
    email : z.email('invalid email address'),
    password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    // Use regex to check for capital, number, and special character
    .regex(/[A-Z]/, "Password must contain at least one capital letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special symbol"),
});

//user login data validation schema
const LoginUserSchema = z.object({
    email : z.email('invalid email address'),
    password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    // Use regex to check for capital, number, and special character
    .regex(/[A-Z]/, "Password must contain at least one capital letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special symbol"),
})

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
export type LoginUserInput = z.infer<typeof LoginUserSchema>;