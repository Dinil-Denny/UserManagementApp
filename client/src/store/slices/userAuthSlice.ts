// A central location to store if the user is logged in, who they are, and their JWT token.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//for state hydration - that is to persist user login state even after page refresh 
// 1. Check LocalStorage synchronously for stored token and user object(stored while login) before creating the initial state
const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');
console.log('stored user:',storedUser);

// Function to safely parse user data
const getInitialUser = () => {
  if (!storedUser) return null;
  try {
    // If it's "[object Object]", this will fail and move to 'catch'
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    localStorage.removeItem("user"); // Clean up the bad data
    return null;
  }
};

interface UserAuthState {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    profileImgURL: string;
  } | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserAuthState = {
  user: getInitialUser(),
  // Persistence Check: When the app first loads, we check localStorage.
  token: storedToken ? storedToken : null,
  isLoading: false,
  error: null,
};

export const userAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // These functions change the Redux state when we call 'dispatch()'
    setCredentials: (
      state,
      action: PayloadAction<{ user: any; token: string }>,
    ) => {
      const { user, token } = action.payload;
      console.log("user,token - userAuthSlice/setCredentials:", user, token);
      state.user = user;
      state.token = token;
      state.error = null;
      console.log("state - setCredentials:", state.user, state.token);
      // Persistence: When we log in, we save the token & user to localStorage.
      localStorage.setItem("token", token);
      localStorage.setItem("user",JSON.stringify(user));
      console.log("token set to localstorage");
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      // Logout - We clear the token from localStorage.
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      state.token = token;
      localStorage.setItem("token", token);
    },
  },
});

export const { setCredentials, logOut, setAuthError, setLoading, setToken } = userAuthSlice.actions;
export default userAuthSlice.reducer;
