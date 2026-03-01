import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser, GetUser } from "./AuthOperation";

type User = { id: number; email: string; username: string };

type AuthState = {
  token: string;
  user: User | null;
  isLoading: boolean;
  isLogin: boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: "",
  user: null,
  isLoading: false,
  isLogin: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.token = "";
      state.isLogin = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLogin = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Error";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLogin = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Error";
      })
      .addCase(GetUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLogin = true;
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Error";
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
