import React, { useState } from "react";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { toast } from "react-toastify";

const AdminLogin = () => {
  //admin credentials
  const adminDetails = { email: "admin@gmail.com", password: "admin123" };

  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmission = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log(`email:${adminEmail},pass:${password}`);
    if (!adminEmail || !password) {
      toast("Enter full credentials", { theme: "colored", type: "warning" });
    } else if (
      adminEmail === adminDetails.email &&
      password === adminDetails.password
    ) {
      toast("Login Successful ✅", { theme: "colored", type: "success" });
    } else {
      toast("Invalid Credentials! 🚨", { theme: "colored", type: "error" });
    }
  };

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
          <form id="admin-login-form" onSubmit={handleSubmission}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            form="admin-login-form"
          >
            Access Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
