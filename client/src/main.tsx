import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
//google auth provider - wrap our app component
import { GoogleOAuthProvider } from '@react-oauth/google';

import "./index.css";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";

//user pages
import UserPrivateRoute from "@components/auth/userPrivateRoute";

import Home from "@pages/user/home";
import UserLogin from "./pages/user/userLogin";
import UserRegister from "@pages/user/userRegister";
import InputOTPForm from "@pages/user/otp";
import ResetPasswordInputOTPForm from "@pages/user/resetPasswordOTP";
import ResetPassword from "@pages/user/resetPassword";
import EditProfile from "@pages/user/editProfile";

//admin pages
import AdminLogin from "@pages/admin/adminLogin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* ---------------user routes----------------- */}
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/verify-otp" element={<InputOTPForm />} />
      <Route path="/reset-pass-verify-otp" element={<ResetPasswordInputOTPForm/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      {/* ------------private routes--------------- */}
      <Route element={<UserPrivateRoute/>}>
        <Route index={true} path="/" element={<Home/>}/>
        <Route path="/edit-profile" element={<EditProfile/>}/>
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
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
      <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
);
