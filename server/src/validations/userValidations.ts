import * as z from "zod";

//user registration data validation schema
export const registerUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email("invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    // Use regex to check for capital, number, and special character
    .regex(/[A-Z]/, "Password must contain at least one capital letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    //.regex(/[^a-zA-Z0-9]/, "Password must contain at least one special symbol"),
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
    //.regex(/[^a-zA-Z0-9]/, "Password must contain at least one special symbol"),
});

//reset password data validation schema
export const resetPasswordSchema = z.object({
  email: z.email("invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    // Use regex to check for capital, number, and special character
    .regex(/[A-Z]/, "Password must contain at least one capital letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    //.regex(/[^a-zA-Z0-9]/, "Password must contain at least one special symbol"),
});

//edit profile input data validation schema
export const editProfileSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be under 20 characters"),
  email: z.email("invalid email address"),
  profileImgURL: z
    .custom<File>((v) => v instanceof File, {
      message: "image is required",
    })
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "File size must be under 5MB",
    })
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      { message: "Only .jpg, .png, and .webp formats are supported." },
    ),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type EditProfileInput = z.infer<typeof editProfileSchema>;
