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

const ResetPasswordInputOTPForm = () => {
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

      const userEmail = localStorage.getItem("userEmail");
      console.log('user email - resend otp:',userEmail);
      await api.post("/resend-otp",{email: userEmail});
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
      const response = await api.post("/resetPassword-verify-otp", sendData);
      console.log('otp verfication response-',response);
      toast.success("Email verified successfully!");
      localStorage.removeItem("otpExpiry"); // Clean up on success
      // localStorage.removeItem("userEmail");
      navigate("/reset-password");
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
                        <InputOTPGroup>
                          {[0, 1, 2].map((i) => (
                            <InputOTPSlot
                              key={i}
                              index={i}
                              className="h-12 w-10 text-lg"
                            />
                          ))}
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
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

export default ResetPasswordInputOTPForm;
