import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import {
  resetPasswordSchema,
  ResetPasswordInput,
} from "../../schemas/authSchema";
import api from "@api/api";

import { Button } from "@components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Spinner } from "@components/ui/spinner";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  //importing register logic from custom useAuth hook
  //const { isLoading } = useAuth(); //---------
  const navigate = useNavigate();
  //React hook form setup with zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      console.log("reset pass data :", data);
      const { password, confirmPassword } = data;
      const email = localStorage.getItem("userEmail");
      const response = await api.post("/reset-password", { email, password });
      console.log('response.data from reset password:',response.data);
      toast.success(response.data.message);
      navigate('/login');
    } catch (err:any) {
        const message = err.response?.data?.message || "Reset password failed";
        toast.error(message);
    } finally {
        localStorage.removeItem('userEmail');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} id="register-form">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">New Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            form="register-form"
          >
            Reset Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
