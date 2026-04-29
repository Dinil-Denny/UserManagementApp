import { PencilIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface UserProfileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserProfileDialog = ({
  isOpen,
  onOpenChange,
}: UserProfileDialogProps) => {
  const navigate = useNavigate();
  //getting user data from redux
  const user = useSelector((state: RootState) => state.userAuth.user);
  //if(!user) return null;
  //handle edit click
  const handleEdit = () => {
    //close the dialog and navigate to edit profile page
    onOpenChange(false);
    navigate("/edit-profile");
  };
  //avatar fallback
  const usernameInitials = user?.username
    ? user.username.substring(0, 2).toUpperCase()
    : "US";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* We use sm:max-w-md to keep it looking like a compact profile card */}
      {/* onOpenAutoFocus function will prevent tooltip appearing while opening the dialog */}
      <DialogContent className="sm:max-w-md p-8">
        {/* Required for Shadcn accessibility, but we hide it visually */}
        <DialogHeader className="sr-only">
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>

        <div className="relative flex flex-col items-center">
          {/* Edit Button */}
          <div className="absolute -top-3 left-7">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="absolute top-0 right-0"
                    size="icon"
                    variant="outline"
                    onClick={handleEdit}
                  >
                    <PencilIcon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit Profile</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Avatar Section */}
          <Avatar className="size-24 border mb-4 shadow-sm">
            <AvatarImage
              alt={`${user?.username}'s avatar`}
              src={user?.profileImgURL || ""} // Uses the Google picture or uploaded image
            />
            <AvatarFallback className="font-medium text-2xl">
              {usernameInitials}
            </AvatarFallback>
          </Avatar>

          {/* User Details */}
          <span className="font-medium text-2xl tracking-tight">
            {user?.username}
          </span>
          <span className="mt-1 text-muted-foreground">{user?.email}</span>

          {/* Account Status Badge */}
          <div className="mt-6 flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Account Status:
            </span>
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              {/* Adjust 'user.status' to whatever property you use in your DB, or default to Active */}
              Active
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
