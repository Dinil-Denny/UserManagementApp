import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { loginUserSchema, LoginUserInput } from "../../schemas/authSchema";
import ForgotPasswordDialog from "./forgotPasswordDialog";
import GoogleAuthButton from "@components/googleAuthButton";

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

const UserLogin = () => {
  // import these logic from the custom hook.
  const { handleLogin, isLoading } = useAuth();
  //React hook form setup with zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = (data:LoginUserInput) => {
    handleLogin(data);
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} id="login-form">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  {...register('email')}
                />
                {/* 3. Real-time Zod validation error display */}
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <div className="ml-auto">
                    <ForgotPasswordDialog/>
                  </div>
                </div>
                <Input id="password" type="password" required {...register('password')}/>
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer" form="login-form">
             {isLoading ? <Spinner/> : 'Login'}
          </Button>
          {/* google auth button */}
           <div className="w-full flex justify-center mt-4">
            <GoogleAuthButton/> 
           </div>
          
        </CardFooter>
        <p className="text-center text-sm">
          Don&apos;t have an account?
          <Link className="ml-1 underline text-primary" to="/register">
            Create account
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default UserLogin;
