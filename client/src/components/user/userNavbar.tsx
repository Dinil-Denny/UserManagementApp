import { useState } from "react";
import { Menu, X, User, LogIn, LogOut } from "lucide-react";
import { Button } from "@components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Link } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import UserProfileDialog from "@pages/user/myAccountDialog";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  //state for opening and closing of user profile dialog
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  //In React, we should use the useSelector hook inside a component to get the state.
  // const user = useSelector((state: RootState) => state.userAuth.user);
  // console.log("user in navbar: ", user);

  const { handleLogout } = useAuth();

  const {token,user} = useSelector((state: RootState) => state.userAuth);
  const role = user?.role;

  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-md font-bold">
            U
          </div>
          <span className="font-semibold text-lg">User-Manager</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          {/* Example Links
          {user ? (
            
          ) : null} */}

          {/* 👤 Right side actions */}
          {(token && role==='user') ? (
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-sm font-medium cursor-pointer"
                onClick={() => setIsProfileOpen(true)}
              >
                My Account
              </Button>
              {/* Profile Avatar */}
              <Avatar>
                <AvatarImage src={user?.profileImgURL} />
                <AvatarFallback>
                  {user?.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Logout */}
              <Button
                variant="default"
                className="flex items-center gap-2 *
                cursor-pointer"
                onClick={() => handleLogout()}
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button className="flex items-center gap-2 cursor-pointer">
                <LogIn size={16} />
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          {/* <Link to="/dashboard" className="block text-sm">
            Dashboard
          </Link>
          <Link to="/users" className="block text-sm">
            Users
          </Link> */}

          {token ? (
            <>
              <div className="flex items-center gap-2" onClick={()=>{
                setIsProfileOpen(true);
                setIsOpen(false); //we close the mobile menu when opening user profile dialog
              }}>
                <Avatar>
                  <AvatarImage src={user?.profileImgURL} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Button
                  variant="link"
                  className="text-sm font-medium cursor-pointer"
                  onClick={() => setIsProfileOpen(true)}
                >
                  My Account
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full flex gap-2
                cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button className="w-full flex gap-2 cursor-pointer">
                <LogIn size={16} />
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
      {/* The Profile Dialog */}
      <UserProfileDialog
        isOpen={isProfileOpen}
        onOpenChange={setIsProfileOpen}
      />
    </nav>
  );
};

export default UserNavbar;
