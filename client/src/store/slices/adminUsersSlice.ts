import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import api from "@api/api";
import { User, AddUser } from "../../types/admin/adminSideTypes";
import { toast } from "react-toastify";

// interface User {
//   id: string;
//   username: string;
//   email: string;
//   profileImgURL?: string;
//   isBlocked: boolean;
// }

interface InitialState {
  users: User[];
  summary: { total: number; active: number; blocked: number };
  loading: boolean;
  error: string | null;
  fetchError: string | null,  // For the initial table load
  // actionError: null, // For addUser, deleteUser, etc.
}

const initialState: InitialState = {
  users: [],
  summary: { total: 0, active: 0, blocked: 0 },
  loading: false,
  error: null,
  fetchError: null,
};

//async thunk to fetch all users data
export const fetchAllUsers = createAsyncThunk(
  "adminUsers/fetchAll", //name of this thunk
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/users");
      console.log("response data: ", response.data);
      return response.data.users;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

//toggle user status - block/unblock
export const toggleUserStatus = createAsyncThunk(
  "adminUsers/toggleUserStatus",
  async (
    { id, isBlocked }: { id: string; isBlocked: boolean },
    { dispatch, rejectWithValue },
  ) => {
    console.log(`id:${id},isBlocked:${isBlocked} - toggleUserStatus adminUserSlice`);
    try {
      const response = await api.patch(`/admin/users/${id}/status`, { isBlocked });
      toast.success(response.data.message);
      //after updating the status fetch the updated users list
      await dispatch(fetchAllUsers());
      return { id, isBlocked }; // this will be the action payload
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  },
);

//delete user
export const deleteUser = createAsyncThunk(
  "adminUsers/delete",
  async (id: string, { dispatch, rejectWithValue }) => {
    console.log('delete user thunk called');
    try {
      console.log(`id:${id} - to delete`);
      const response = await api.delete(`/admin/user/${id}/delete`);
      await dispatch(fetchAllUsers());
      toast.success(response.data.message);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  },
);

//add new user
export const addUser = createAsyncThunk(
  "adminUsers/add",
  async (userData: AddUser, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(`/admin/user/add`, userData);
      toast.success(response.data.message);
      await dispatch(fetchAllUsers());
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to add user";
      console.log(`error message while adding user: ${message}`);
      return rejectWithValue(message);
    }
  },
);

//edit user details
export const updateUser = createAsyncThunk(
  "adminUsers/update",
  async (
    { id, userData }: { id: string; userData: any },
    { dispatch, rejectWithValue },
  ) => {
    console.log('updateUser thunk called:',id,userData);
    try {
      console.log(`id:${id}, userData:${userData} - update user`);
      const response = await api.patch(`/admin/user/${id}/update`, userData);
      toast.success(response.data.message);
      await dispatch(fetchAllUsers());
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update user details");
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
      //for fetchAllUsers()
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payload:", action.payload);
        state.users = action.payload.users;
        state.summary = action.payload.summary;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        const errorMessage = action.payload as string;
        state.fetchError = errorMessage;
        toast.error(errorMessage); //displaying error in toast notification
      })
      //for toggling user status
      .addCase(toggleUserStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { id, isBlocked } = action.payload;
        const user = state.users.find((u: User) => u.id === id);
        if (user) {
          user.isBlocked = isBlocked;
        }
        state.error = null;
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.loading = false
        const errorMessage = action.payload as string;
        state.error = errorMessage;
        toast.error(errorMessage);
      })
      //deleting user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload; //id of deleted user
        state.users = state.users.filter((u: User) => u.id !== id); //filtering out users other than deleted user
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading =false;
        const errorMessage = action.payload as string;
        state.error = errorMessage;
        toast.error(errorMessage);
      })
      //adding new user
      // .addCase(addUser.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(addUser.fulfilled, (state) => {
      //   state.loading = false;
      //   state.error = null;
      // })
      // .addCase(addUser.rejected,(state,action) => {
      //   state.loading = false;
      //   const errorMessage = action.payload as string;
      //   state.error = errorMessage;
      //   toast.error(errorMessage);
      // })
      //editing user details
      // .addCase(updateUser.pending,(state) => {
      //   state.loading = true;
      // })
      // .addCase(updateUser.fulfilled, (state) => {
      //   state.loading = false;
      //   state.error = null;
      // })
      // .addCase(updateUser.rejected, (state, action) => {
      //   state.loading = false;
      //   const errorMessage = action.payload as string;
      //   state.error = errorMessage;
      //   toast.error(errorMessage);
      // })
  },
});

export const { updateUserStatusLocally } = adminUsersSlice.actions;
export default adminUsersSlice.reducer;
