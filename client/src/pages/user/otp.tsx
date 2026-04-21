// import { useEffect, useMemo, useState } from "react";
// import { RefreshCwIcon } from "lucide-react";
// import { otpSchema, OTPInput } from "../../schemas/authSchema";
// import api from "@api/api";
// import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useNavigate } from "react-router-dom";

// import { Button } from "@components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@components/ui/card";
// import { Field, FieldDescription, FieldLabel } from "@components/ui/field";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@components/ui/input-otp";
// import { toast } from "react-toastify";

// const OTP_LENGTH = 6;
// const COOLDOWN_SECONDS = 60; //resend otp countdown seconds
// const RESEND_COUNTER = "otp-resend-expires-at"; //countdown is stored in localstorage for persistance. This is it's key

// const InputOTPForm = () => {
//   const navigate = useNavigate();

//   const [secondsLeft, setSecondsLeft] = useState(0);
//   const [isResending, setIsResending] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<OTPInput>({
//     resolver: zodResolver(otpSchema),
//     defaultValues: {
//       otp: "",
//     },
//   });

//   const updateSecondsLeft = () => {
//     const raw = localStorage.getItem(RESEND_COUNTER);
//     if (!raw) {
//       setSecondsLeft(0);
//       return;
//     }

//     const expiresAt = Number(raw);
//     const remainingMs = expiresAt - Date.now();

//     if (remainingMs <= 0) {
//       localStorage.removeItem(RESEND_COUNTER);
//       setSecondsLeft(0);
//       return;
//     }

//     setSecondsLeft(Math.ceil(remainingMs / 1000));
//   };

//   useEffect(() => {
//     updateSecondsLeft();
//     const interval = window.setInterval(updateSecondsLeft, 1000);
//     return () => window.clearInterval(interval);
//   }, []);

//   const startCooldown = () => {
//     const expiresAt = Date.now() + COOLDOWN_SECONDS * 1000;
//     localStorage.setItem(RESEND_COUNTER, String(expiresAt));
//     setSecondsLeft(COOLDOWN_SECONDS);
//   };

//   const onSubmit = async (otp: OTPInput) => {
//     try {
//       const email = localStorage.getItem("userEmail");
//       const response = await api.post("/verify-otp", { otp, email });
//       toast.success(response.data?.message ?? "OTP verified successfully.");
//       localStorage.removeItem(RESEND_COUNTER); //remove countdown timer key from localstorage
//       localStorage.removeItem("userEmail"); //when otp is verified remove user email from localstorage
//       navigate("/login");
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message ??
//           "Failed to verify OTP. Please try again.",
//       );
//     }
//   };

//   const handleResendOtp = async () => {
//     try {
//       setIsResending(true);
//       await api.post("/resend-otp");
//       startCooldown();
//       toast.success("OTP send successfully");
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message ??
//           "Failed to resend OTP. Please try again.",
//       );
//     } finally {
//       setIsResending(false);
//     }
//   };

//   const resendLabel = useMemo(() => {
//     if (secondsLeft > 0) {
//       const mm = Math.floor(secondsLeft / 60)
//         .toString()
//         .padStart(2, "0");
//       const ss = (secondsLeft % 60).toString().padStart(2, "0");
//       return `${mm}:${ss}`;
//     }
//     return "00:00";
//   }, [secondsLeft]);

//   return (
//     <div className="h-screen flex items-center justify-center">
//       <Card className="mx-auto max-w-md">
//         <CardHeader>
//           <CardTitle>Verify your Email</CardTitle>
//           <CardDescription>
//             Enter the verification code we sent to your email address
//           </CardDescription>
//         </CardHeader>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <CardContent>
//             <Field>
//               <div className="flex items-center justify-between">
//                 <FieldLabel htmlFor="otp-verification">
//                   Verification code
//                 </FieldLabel>
//               </div>
//               <Controller
//                 control={control}
//                 name="otp"
//                 render={({ field }) => (
//                   <InputOTP
//                     maxLength={OTP_LENGTH}
//                     id="otp-verification"
//                     value={field.value}
//                     onChange={field.onChange}
//                   >
//                     <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
//                       <InputOTPSlot index={0} />
//                       <InputOTPSlot index={1} />
//                       <InputOTPSlot index={2} />
//                     </InputOTPGroup>

//                     <InputOTPSeparator className="mx-2" />

//                     <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
//                       <InputOTPSlot index={3} />
//                       <InputOTPSlot index={4} />
//                       <InputOTPSlot index={5} />
//                     </InputOTPGroup>
//                   </InputOTP>
//                 )}
//               />
//             </Field>
//             {errors.otp && (
//               <p className="text-sm text-red-500">{errors.otp.message}</p>
//             )}
//           </CardContent>
//         </form>
//         <CardFooter>
//           <Field>
//             <Button type="submit" className="w-full" disabled={isSubmitting}>
//               {isSubmitting ? "Verifying..." : "Verify"}
//             </Button>
//             <div className="flex flex-row justify-between">
//               <Button
//                 variant="outline"
//                 size="xs"
//                 disabled={secondsLeft > 0 || isResending}
//                 onClick={handleResendOtp}
//               >
//                 <RefreshCwIcon />
//                 {isResending ? "Resending..." : "Resend OTP"}
//               </Button>
//               <span>{resendLabel}</span>
//             </div>
//           </Field>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default InputOTPForm;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCwIcon } from "lucide-react";
import { toast } from "react-toastify";
import api from "@api/api"; //axios instance
import { otpSchema, OTPInput } from "../../schemas/authSchema";

import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@components/ui/input-otp";

const InputOTPForm = () => {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OTPInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  // Timer Persistence Logic
  useEffect(() => {
    const checkTimer = () => {
      const expiry = localStorage.getItem("otpExpiry");
      if (expiry) {
        const remaining = Math.max(
          0,
          Math.floor((parseInt(expiry) - Date.now()) / 1000),
        );
        setTimeLeft(remaining);
      }
    };

    checkTimer();
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Resend OTP Handler
  const handleResend = async () => {
    try {
      // Set expiry to 60 seconds from now and save to localStorage
      const newExpiry = Date.now() + 60000;
      localStorage.setItem("otpExpiry", newExpiry.toString());
      setTimeLeft(60);

      await api.post("/resend-otp");
      toast.success("New OTP sent to your email!");
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  // Verify OTP Handler
  const onSubmit = async (data: OTPInput) => {
    setIsSubmitting(true);
    try {
      const userEmail = localStorage.getItem("userEmail");
      const sendData = { otp: data.otp, email: userEmail };

      console.log("otp veri data:", sendData);

      const response = await api.post("/verify-otp", sendData);
      toast.success("Email verified successfully!");
      localStorage.removeItem("otpExpiry"); // Clean up on success
      localStorage.removeItem("userEmail");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Verify your Email</CardTitle>
              <CardDescription>
                Enter the 6-digit code sent to your inbox.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-2">
                    <FormLabel className="self-start">
                      Verification code
                    </FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        // This prevents internal shadcn errors with controlled components
                        onChange={(val) => field.onChange(val)}
                      >
                        <InputOTPGroup className="gap-1">
                          {[0, 1, 2].map((i) => (
                            <InputOTPSlot
                              key={i}
                              index={i}
                              className="h-12 w-10 text-lg"
                            />
                          ))}
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup className="gap-1">
                          {[3, 4, 5].map((i) => (
                            <InputOTPSlot
                              key={i}
                              index={i}
                              className="h-12 w-10 text-lg"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Verifying..." : "Verify"}
              </Button>

              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-muted-foreground">
                  {timeLeft > 0
                    ? `Resend in ${timeLeft}s`
                    : "Didn't get a code?"}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleResend}
                  disabled={timeLeft > 0}
                >
                  <RefreshCwIcon
                    className={`mr-2 h-4 w-4 ${timeLeft > 0 ? "animate-spin" : ""}`}
                  />
                  Resend Code
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default InputOTPForm;
