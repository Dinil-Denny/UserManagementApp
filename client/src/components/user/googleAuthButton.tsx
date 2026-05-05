import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { setLoading, setCredentials } from "../store/slices/userAuthSlice";
import api from "@api/api";
import { AppDispatch, RootState } from "../store/store";
import { toast } from "react-toastify";

const GoogleAuthButton = () => {
  const { handleGoogleAuth } = useAuth();
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();

  const handleSuccess = async (credentialResponse: any) => {
    const googleToken = credentialResponse.credential;
      console.log("googleToken:", googleToken, typeof googleToken);
      handleGoogleAuth(googleToken);
    // try {
    //   getting the ID token from google
    //   const googleToken = credentialResponse.credential;
    //   console.log("googleToken:", googleToken, typeof googleToken);
    //   handleGoogleAuth(googleToken);
    //     dispatch(setLoading(true));
    //     //sending it to our backend
    //     const response = await api.post("/google-auth", { token: googleToken });
    //     console.log("response data from googleAuth:", response.data);
    //     //update global Redux state with token and user info
    //     dispatch(
    //       setCredentials({
    //         token: response.data.accessToken,
    //         user: response.data.user,
    //       }),
    //     );
    //     toast.success("Login Successful");
    //     navigate("/");
    // } catch (error: any) {
    //     const message = error.response?.data?.message || "Sign in failed";
    //     toast.error(message);
    // } finally {
    //     dispatch(setLoading(false));
    // }
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
        theme="outline"
        size="medium"
        shape="pill"
      />
    </div>
  );
};

export default GoogleAuthButton;
