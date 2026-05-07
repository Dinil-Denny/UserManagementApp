import { useState } from "react";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { Button } from "@components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useAuth } from "@hooks/useAuth";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {handleLogout} = useAuth()

  const {token,user} = useSelector((state:RootState)=>state.userAuth);
  const role = user?.role;

  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-md font-bold">
            A
          </div>
          <span className="font-semibold text-lg">
            Admin Panel
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          
          {/* Example Links */}
          {/* <Link to="/dashboard" className="text-sm font-medium hover:text-blue-500">
            Manage Users
          </Link> */}

          {/* 👤 Right side actions */}
          {(token && role === 'admin') ? (
            <div className="flex items-center gap-4">
              {/* Logout */}
              <Button variant="outline" className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/admin/login">
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
          
          <Link to="/dashboard" className="block text-sm">
            Dashboard
          </Link>
          <Link to="/users" className="block text-sm">
            Users
          </Link>

          {(token && role === 'admin') ? (
            <>
              <Button variant="outline" className="w-full flex gap-2 cursor-pointer" onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/admin/login">
            <Button className="w-full flex gap-2 cursor-pointer">
              <LogIn size={16} />
              Login
            </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;