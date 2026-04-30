import { useState, useRef, ChangeEvent } from "react";
import { Upload, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema, EditProfileInput } from "../../schemas/authSchema";
import { useAuth } from "@hooks/useAuth";

import { Spinner } from "@components/ui/spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
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
import { Button } from "@components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";

const EditProfile = () => {
  const { handleEditProfile } = useAuth();
  const { user } = useSelector((state: RootState) => state.userAuth);

  // Local state for form edits
  // const [username, setUsername] = useState(user?.username || "");
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user?.profileImgURL || null,
  );

  // Reference to the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  //setup form
  const form = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      profileImgURL: undefined, // File inputs start undefined
    },
  });

  // Handle local image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Createing URL for immediate preview
      setPreviewUrl(URL.createObjectURL(file));
      form.setValue("profileImgURL", file, { shouldValidate: true });
    }
  };

  //form submit handler
  const onSubmit = async (values: EditProfileInput) => {
    try {
      console.log("values from edit profile page:",values);
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      //only append if a new file is selected
      if (values.profileImgURL) {
        formData.append("profileImgURL", values.profileImgURL);
      };
      console.log('formData - edit profile:',formData);
      await handleEditProfile(formData);
    } catch (error: any) {
      console.error("Update failed", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    };
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-muted/20 p-6">
      <Card className="w-full max-w-xl shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Profile</CardTitle>
          <CardDescription>
            Update your username and profile photo.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* --- Image Upload Section --- */}
              {/* We wrap this in a FormField to get the error message */}
              <FormField
                control={form.control}
                name="profileImgURL"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <Avatar className="size-24 border">
                        <AvatarImage src={previewUrl || ""} alt="Profile" />
                        <AvatarFallback className="text-2xl bg-muted">
                          {form.getValues("username").substring(0, 2).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="text-center w-full">
                      {/* The Hidden Input */}
                      <Input
                        {...fieldProps}
                        type="file"
                        accept="image/jpeg, image/png, image/webp"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={(event) => {
                          handleImageChange(event);
                          // Don't call standard onChange here or it breaks the file object
                        }}
                      />

                      {/* The visible input button */}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-2 font-medium"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="size-4" />
                        Change photo
                      </Button>

                      {/* AUTOMATIC ZOD ERROR MESSAGE */}
                      <FormMessage className="mt-2 text-center" />
                    </div>
                  </FormItem>
                )}
              />

              <hr className="border-border/50" />

              {/* --- Username Field --- */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- Email Field (Read Only) --- */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        disabled 
                        className="bg-muted text-muted-foreground" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex justify-end gap-3 px-0 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    form.reset();
                    setPreviewUrl(user?.profileImgURL || null);
                  }}
                >
                  Reset
                </Button>
                
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? <Spinner/> : 'Save Changes'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;
