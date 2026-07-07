import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Switch } from "@components/ui/switch";
import StatusBadge from "./statusBadge";
import { User } from "../../types/admin/adminSideTypes";
import DeleteUserDialog from "./deleteUserDialog";
import EditUserDialog from "./editUserDialog";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  deleteUser,
  toggleUserStatus,
} from "../../store/slices/adminUsersSlice";

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  //handling toggle status
  const handleToggleStatus = (id: string, currentStatus: boolean) => {
    console.log(`toggled id: ${id}, current status: ${currentStatus}`);
    const isBlocked = !currentStatus;
    dispatch(toggleUserStatus({ id, isBlocked }));
  };
  //handling deleting user
  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-20">Avatar</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Access Control</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              {/* AVATAR */}
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.profileImgURL} />
                  <AvatarFallback className="bg-slate-200 text-slate-600">
                    {user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>

              {/* USER INFO */}
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell className="text-slate-500">{user.email}</TableCell>

              {/* STATUS BADGE */}
              <TableCell>
                <StatusBadge status={user.isBlocked ? "Blocked" : "Active"} />
              </TableCell>

              {/* TOGGLE SWITCH */}
              <TableCell>
                <Switch
                  className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500 cursor-pointer"
                  checked={!user.isBlocked}
                  onCheckedChange={() =>
                    handleToggleStatus(user.id, user.isBlocked)
                  }
                />
              </TableCell>

              {/* ACTION BUTTONS */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {/* edit button */}
                  <EditUserDialog key={user.id} id={user.id} email={user.email} username={user.username}/>
                  {/* <Button
                    variant="ghost"
                    size="icon"
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button> */}
                  {/* delete button */}
                  <DeleteUserDialog
                    username={user.username}
                    onConfirm={() => handleDeleteUser(user.id)}
                  />
                  {/* <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-800 hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button> */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
