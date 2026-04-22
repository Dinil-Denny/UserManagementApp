import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";

//user pages
import UserPrivateRoute from "@components/auth/userPrivateRoute";

import UserLogin from "./pages/user/userLogin";
import UserRegister from "@pages/user/userRegister";
import InputOTPForm from "@pages/user/otp";

//admin pages
import AdminLogin from "@pages/admin/adminLogin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* ---------------user routes----------------- */}
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/verify-otp" element={<InputOTPForm />} />
      {/* ------------private routes--------------- */}
      <Route path="" element={<UserPrivateRoute/>}>
        
      </Route>

      {/* ----------------admin routes----------------- */}
      <Route path="/admin/login" element={<AdminLogin />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Providing Redux store to the entire app */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
