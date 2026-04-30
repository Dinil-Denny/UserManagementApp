import * as z from "zod";

// This Zod schema ensures the data is strictly typed and validated. So catch errors BEFORE they reach your backend.

//user registration data validation schema
export const registerUserSchema = z
  .object({
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
    confirmPassword: z
      .string()
      .regex(/[A-Z]/, "Password must contain at least one capital letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    //.regex(/[^a-zA-Z0-9]/, "Password must contain at least one special symbol"),
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
    .regex(/[0-9]/, "Password must contain at least one number"),
  //.regex(/[^a-zA-Z0-9]/, "Password must contain at least one special symbol"),
});

//otp input validation schema
export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

//email verification schema for reset password
export const emailSchema = z.object({
  email: z.email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      // Use regex to check for capital, number, and special character
      .regex(/[A-Z]/, "Password must contain at least one capital letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    //.regex(/[^a-zA-Z0-9]/, "Password must contain at least one special symbol"),
    confirmPassword: z
      .string()
      .regex(/[A-Z]/, "Password must contain at least one capital letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    //.regex(/[^a-zA-Z0-9]/, "Password must contain at least one special symbol"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: `Passwords don't match`,
    path: ["confirmPassword"],
  });

//edit profile shcema
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

// We infer the types directly from the schemas, ensuring a Single Source of Truth.

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type OTPInput = z.infer<typeof otpSchema>;
export type EmailInput = z.infer<typeof emailSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type EditProfileInput = z.infer<typeof editProfileSchema>;
