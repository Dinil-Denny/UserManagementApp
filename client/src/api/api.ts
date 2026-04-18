import axios from "axios";
//importing store so we can attach the jwt token with requests send to server
import { store } from "store/store";

//this is a single, configured instance of Axios for all requests.

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

//creating axios interceptors to attach JWT to headers automatically.
api.interceptors.request.use((config) => {
  const token = store.getState().userAuth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
