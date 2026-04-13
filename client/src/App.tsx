import { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { Button, buttonVariants } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div>
        <Button onClick={() => toast("Button clicked")}>
          Toast a Notification
        </Button>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>
              Track progress and recent activity for your Vite app.
            </CardDescription>
          </CardHeader>
          <CardContent>
            Your design system is ready. Start building your next component.
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default App;
