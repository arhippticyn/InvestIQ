import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser, getUser, getNewRefresh } from "./AuthOperation";

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
  initialState,
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
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLogin = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLogin = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLogin = true;
      })
      .addCase(getNewRefresh.fulfilled, (state) => {
        state.isLoading = false;
      });

    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.error = (action as PayloadAction<string | undefined>).payload || "Error";
        }
      );
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;