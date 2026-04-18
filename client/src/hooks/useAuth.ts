import { useDispatch, useSelector } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "@api/api";
import { AppDispatch, RootState } from "store/store";
import {
  setCredentials,
  logOut,
  setAuthError,
  setLoading,
} from "store/slices/userAuthSlice";
import { LoginUserInput, RegisterUserInput } from "schemas/authSchema";

//Components should only focus on rendering.
//  All logic related to authentication is placed here.

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.userAuth);

  const handleLogin = async (data: LoginUserInput) => {
    try {
      //1.Mark as loading
      dispatch(setLoading(true));
      //2.Axios service call
      const response = await api.post("/login", data);
      //3.When response came update global Redux state with token and user info
      dispatch(
        setCredentials({
          token: response.data.token,
          user: response.data.user,
        }),
      );
      //4.Toast and redirect
      toast.success("Login Successful");
      navigate("/home");
    } catch (err: any) {
      const message = err.response?.data?.message || "Login Failed";
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRegister = async (data: RegisterUserInput) => {
    try {
      await api.post("/register", data);
      toast.success("OTP send successfully");
      navigate("/otp-verification");
    } catch (err: any) {
      const message = err.response?.data?.message || "Registration failed";
      toast.error(message);
    }
  };

  const handleLogout = async () => {
    dispatch(logOut());
    navigate("/login");
    toast.info("Logged out");
  };

  return {...authState, handleLogin, handleRegister, handleLogout};
};
