import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "@api/api";
import { AppDispatch, RootState } from "../store/store";
import {
  setCredentials,
  logOut,
  setAuthError,
  setLoading,
  setToken,
  updateUserInfo,
} from "../store/slices/userAuthSlice";
import {
  LoginUserInput,
  RegisterUserInput,
  EditProfileInput,
} from "../schemas/authSchema";

//Components should only focus on rendering.
//  All logic related to authentication is placed here.

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.userAuth);

  const handleRegister = async (data: RegisterUserInput) => {
    try {
      console.log("handleRegister - useAuth:", data);
      dispatch(setLoading(true));
      await api.post("/register", data);
      console.log("1");
      toast.success("OTP send successfully");
      console.log("2");

      //setting resend otp timer to 1 minute. So after registering when otp input page come there will be a 1 min timer
      //only completing the timer 'resend otp' button got enabled
      const newExpiry = Date.now() + 60000;
      localStorage.setItem("otpExpiry", newExpiry.toString());
      navigate("/verify-otp");
      console.log("3");
    } catch (err: any) {
      const message = err.response?.data?.message || "Registration failed";
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async (data: LoginUserInput) => {
    try {
      //1.Mark as loading
      dispatch(setLoading(true));
      //2.Axios service call
      const response = await api.post("/login", data);
      console.log("response data:", response.data);
      //3.When response came update global Redux state with token and user info
      dispatch(
        setCredentials({
          token: response.data.accessToken,
          user: response.data.user,
        }),
      );
      //4.Toast and redirect
      if (response.data.user.role === "admin") {
        toast.success("Access grantend");
        navigate('/admin');
      } else {
        toast.success("Login Successful");
        navigate("/");
      }
    } catch (err: any) {
      if (err.response?.data?.errorCode === "USER_NOT_VERIFIED") {
        toast.info("Please verify your email first. A new OTP has been sent.");
        navigate("/verify-otp");
        localStorage.setItem("userEmail", data.email);
        return;
      }
      const message = err.response?.data?.message || "Login Failed";
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      console.log("logout api send");
      navigate("/login");
      toast.success("Logged out");
    } catch (err: any) {
      const message = err.response?.data?.message || "Logout failed";
      toast.error(message);
    } finally {
      dispatch(logOut());
      console.log("finally dispatched logout");
    }
  };

  const handleGoogleAuth = async (googleToken: string) => {
    try {
      dispatch(setLoading(true));
      //sending it to our backend
      const response = await api.post("/google-auth", { token: googleToken });
      console.log("response data from googleAuth:", response.data);
      //update global Redux state with token and user info
      dispatch(
        setCredentials({
          token: response.data.accessToken,
          user: response.data.user,
        }),
      );
      toast.success("Login Successful");
      navigate("/");
    } catch (error: any) {
      const message = error.response?.data?.message || "Sign in failed";
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEditProfile = async (formData: FormData) => {
    try {
      console.log("formData in handleEditProfile - useAuth:", formData);

      const response = await api.put("/edit-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("response from edit profile - useAuth:", response);
      //When response came update global Redux state with token and user info
      dispatch(
        updateUserInfo({
          user: response.data.user,
        }),
      );
      toast.success("Profile updated successfully");
      navigate("/");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Error occured while updating your profile";
      toast.error(message);
    }
  };

  // const handleSetToken = async (token:string) => {
  //   try {
  //     dispatch(setToken({token}))
  //   } catch (err: any) {
  //     const message = err.response?.data?.message || "Failde to refresh access token";
  //     toast.error(message);
  //   }
  // }

  return {
    ...authState,
    handleLogin,
    handleRegister,
    handleLogout,
    handleGoogleAuth,
    handleEditProfile,
  };
};
