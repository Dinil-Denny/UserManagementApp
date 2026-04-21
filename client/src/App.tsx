import "./App.css";
import { ToastContainer } from "react-toastify";
import { Outlet, useLocation } from "react-router-dom";
import UserNavbar from "@components/userNavbar";
import AdminNavbar from "@components/adminNavbar";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {isAdminPage ? <AdminNavbar/> : <UserNavbar/>}

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
        theme="colored"
      />
      
      <Outlet/>
    </>
  );
}

export default App;
