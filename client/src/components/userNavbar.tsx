import { useState } from "react";
import { Menu, X, User, LogIn, LogOut } from "lucide-react";
import { Button } from "@components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Link } from "react-router-dom";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 👉 Replace this with real auth logic later
  const token = localStorage.getItem("token");

  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-md font-bold">
            U
          </div>
          <span className="font-semibold text-lg">
            User-Manager
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          
          {/* Example Links */}
          <Link to="/dashboard" className="text-sm font-medium hover:text-blue-500">
            Account Settings
          </Link>

          {/* 👤 Right side actions */}
          {token ? (
            <div className="flex items-center gap-4">
              
              {/* Profile Avatar */}
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/40" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>

              {/* Logout */}
              <Button variant="outline" className="flex items-center gap-2">
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          ) : (
            <Button className="flex items-center gap-2">
              <LogIn size={16} />
              Login
            </Button>
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
          
          <Link to="/dashboard" className="block text-sm">
            Dashboard
          </Link>
          <Link to="/users" className="block text-sm">
            Users
          </Link>

          {token ? (
            <>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/40" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span>My Account</span>
              </div>

              <Button variant="outline" className="w-full flex gap-2">
                <LogOut size={16} />
                Logout
              </Button>
            </>
          ) : (
            <Button className="w-full flex gap-2">
              <LogIn size={16} />
              Login
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;