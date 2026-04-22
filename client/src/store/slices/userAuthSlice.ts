// A central location to store if the user is logged in, who they are, and their JWT token.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserAuthState {
  user: { username: string; email: string; role: string } | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserAuthState = {
  user: null,
  // Persistence Check: When the app first loads, we check localStorage.
  token: localStorage.getItem("token"),
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
      state.user = user;
      state.token = token;
      state.error = null;
      // Persistence: When we log in, we save the token to localStorage.
      localStorage.setItem("token", token);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      // Logout - We clear the token from localStorage.
      localStorage.removeItem("token");
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setCredentials,logOut,setAuthError,setLoading} = userAuthSlice.actions;
export default userAuthSlice.reducer;
