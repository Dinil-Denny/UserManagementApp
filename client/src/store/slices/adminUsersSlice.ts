import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api/api";

interface User {
  id: string;
  username: string;
  email: string;
  profileImgURL?: string;
  isBlocked: boolean;
}

interface InitialState {
  users: User[];
  summary: { total: number; active: number; blocked: number };
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  users: [],
  summary: { total: 0, active: 0, blocked: 0 },
  loading: false,
  error: null,
};

export const fetchAllUsers = createAsyncThunk(
  "adminUsers/fetchAll", //name of this thunk
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin");
      console.log("response data: ", response.data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    // We will use this to update the UI when toggling access
    updateUserStatusLocally: (state, action) => {
      const { id, isBlocked } = action.payload;
      const user = state.users.find((u) => u.id === id);
      if (user) user.isBlocked = isBlocked;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchAllUsers.fulfilled, (state,action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.summary = action.payload.summery;
    })
    .addCase(fetchAllUsers.rejected, (state,action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
  },
});

export const {updateUserStatusLocally} = adminUsersSlice.actions;
export default adminUsersSlice.reducer;
