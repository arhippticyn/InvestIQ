import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser, getUser, getNewRefresh, setNewUsername } from "./AuthOperation";
import type { IUser } from "../../types/user";

type AuthState = {
  token: string;
  user: IUser | null;
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: IUser; token: string }>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLogin = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: IUser; token: string }>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLogin = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLogin = true;
      })
      .addCase(getNewRefresh.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(setNewUsername.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = "";
        state.isLogin = false;
        state.error = null;
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

export default authSlice.reducer;