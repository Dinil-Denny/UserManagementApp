import { useState } from "react";
import { useDispatch, UseDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserSchema, AddUserInput } from "../../schemas/userSchema";
import { addUser } from "../../store/slices/adminUsersSlice";
import { toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import { Spinner } from "@components/ui/spinner";

const AddUserDialog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false); //control modal opening and closing

  const form = useForm<AddUserInput>({
    resolver: zodResolver(addUserSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  const onSubmit = async (data: AddUserInput) => {
    // dispatch() returns a promise. We unwrap it to see if it succeeded or threw an error. unwrap()  method is used to extract the raw result or error from a dispatched async thunk.
    try {
      const result = await dispatch(addUser(data)).unwrap();
      console.log(`result from addUser dialog component: ${result}`);
      form.reset(); //clear the form
      setOpen(false); //close the dialog
    } catch (error:any) {
      toast.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>

        {/* 3. The Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Tony Stark" {...field} />
                  </FormControl>
                  <FormMessage /> {/* Zod errors appear here automatically! */}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jarvis@example.com" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? <Spinner/> : "Add User"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
