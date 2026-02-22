import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import type { AppDispatch } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

type User = { id: number; email: string; username: string };

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },

    setLoading(state) {
      state.isLoading = true;
      state.error = null;
    },

    setError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    logoutUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, setLoading, setError, logoutUser } = authSlice.actions;
export default authSlice.reducer;

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading());

    try {
      await api.post("/auth/login", { email, password });

      const response = await api.get("/auth/users/me");

      dispatch(setUser(response.data));
    } catch (error) {
      dispatch(setError("Невірний емейл або пароль"));
    }
  };

export const registerUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading());

    try {
      const response = await api.post("/auth/register", {
        email,
        password,
      });

      dispatch(setUser(response.data));
    } catch (error) {
      dispatch(setError("Реєстрація неуспішна, повторіть спробу пізніше"));
    }
  };
