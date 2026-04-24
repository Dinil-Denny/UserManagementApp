import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, EmailInput } from "../../schemas/authSchema";
import { toast } from "react-toastify";
import api from "@api/api";

// Shadcn UI Imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import { Spinner } from "@components/ui/spinner";

const ForgotPasswordDialog = () => {
  const navigate = useNavigate();

  // Controls if dialog is open
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  //submit handler
  const onSubmit = async (value: EmailInput) => {
    try {
      //set email to local storage
      localStorage.setItem("userEmail", value.email);
      await api.post("/reset-password-otp", { email: value.email });
      toast.success("OTP send to email");

      // Close the dialog
      setIsOpen(false);

      //setting resend otp timer to 1 minute. So after registering when otp input page come there will be a 1 min timer
      //only completing the timer 'resend otp' button got enabled
      const newExpiry = Date.now() + 60000;
      localStorage.setItem("otpExpiry", newExpiry.toString());
      navigate("/reset-pass-verify-otp");
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* The Trigger is the text/button the user clicks to open the box */}
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-sm font-medium text-primary hover:underline underline-offset-4 cursor-pointer"
        >
          Forgot password?
        </button>
      </DialogTrigger>

      {/* The Content is the actual centered box */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Enter your email address and we'll send you an OTP to reset your
            password.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  {/* zod validation errors will be displayed here */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <Spinner /> : "Send OTP"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
