import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { LoaderPinwheel } from "lucide-react";

const AdminPrivateRoute = () => {
  const { user, token, isLoading } = useSelector((state: RootState) => state.userAuth);

  if (isLoading) {
    return <div><LoaderPinwheel className="animate-spin" /></div>;
  }
  if (token && user?.role === "admin") {
    return <Outlet />;
  }
  return <Navigate to="/admin/login" replace />;
};

export default AdminPrivateRoute;