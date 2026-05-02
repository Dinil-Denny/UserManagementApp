import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { loginUserSchema, LoginUserInput } from "../../schemas/authSchema";
import { useAuth } from "@hooks/useAuth";

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
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Spinner } from "@components/ui/spinner";

const AdminLogin = () => {
  const { handleLogin } = useAuth();

  const form = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
    defaultValues:{email:"",password:""},
  });

  const onSubmit = async(data:LoginUserInput) => {
    console.log('data - admin login:',data);
    handleLogin(data);
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form id="admin-login-form" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">Password</Label>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            form="admin-login-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <Spinner/> : "Access Dashboard"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
