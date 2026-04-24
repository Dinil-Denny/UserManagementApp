import axios from "axios";
//importing store so we can attach the jwt token with requests send to server
import { store } from "../store/store";
import { logOut,setToken } from "../store/slices/userAuthSlice";


//this is a single, configured instance of Axios for all requests.

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  withCredentials: true, //-------------- added this line ****************
});

//creating axios request interceptors to attach JWT to headers automatically.
api.interceptors.request.use(
  (config) => {
    console.log("1-", store.getState().userAuth);
    const token = store.getState().userAuth.token; // or localStorage.getItem('token');
    console.log("token in interceptor:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

//axios response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    //Identify routes that should NOT trigger a redirect to login
    const isOTPRoute = originalRequest.url.includes("/resetPassword-verify-otp");

    // Check if the error is 401 AND we haven't already retried this exact request
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Prevent infinite loops if the refresh route itself fails

      if (isOTPRoute) {
        return Promise.reject(error); 
      }

      if (originalRequest.url === "/auth-refresh") {
        return Promise.reject(error);
      }
      originalRequest._retry = true; // Marking as retried

      try {
        const refreshRespons = await axios.post(
          "http://localhost:3000/auth-refresh",
          {},
          { withCredentials: true },
        );
        const newAccessToken:string = refreshRespons.data.accessToken;
        
        // Save the new token
        store.dispatch(setToken({token:newAccessToken}));
        localStorage.setItem('token', newAccessToken);

        // Update the failed request with the new token and try again
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        // worst case - The Refresh Token is also expired or invalid.
        // The user must log in again.
        localStorage.removeItem('token');
        store.dispatch(logOut());
        window.location.href = '/login';

        return Promise.reject(refreshError);
      };
    };
    // If it's a normal error (like 400 Bad Request or 404 Not Found), just pass it to the component
    return Promise.reject(error);
  },
);

export default api;
