import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema, EditUserInput } from "../../schemas/userSchema";
import { updateUser } from "../../store/slices/adminUsersSlice";
import { AppDispatch } from "../../store/store";

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
import { Edit2 } from "lucide-react";
import { Spinner } from "@components/ui/spinner";

interface IEditUserProps {
  id: string;
  username: string;
  email: string;
};
interface IEditUserFormInput {
    username:string;
    email:string;
};

const EditUserDialog = (userDetails: IEditUserProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  //fill form with default values from props - user
  const form = useForm<EditUserInput>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      username: userDetails.username || "username",
      email : userDetails.email || "user@example.com",
    },
  });

  // Ensure form resets if the selected user prop changes
  useEffect(()=>{
    form.reset({username:userDetails.username,email:userDetails.email})
  },[form,userDetails]);

  //submit handler
  const onSubmit = async(data:IEditUserFormInput) => {
    const result = await dispatch(updateUser({id:userDetails.id,userData:data}));
    if(updateUser.fulfilled.match(result)){
        setOpen(false); //close on successfull submission
    };
  };

  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* This replaces the ghost button in your UsersTable */}
        <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50">
          <Edit2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Edit User Profile</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? <Spinner/> : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
