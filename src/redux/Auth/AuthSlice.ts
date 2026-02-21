import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },

    setLoading(state) {
      state.isLoading = true;
      state.error = null;
    },

    setError(state, action) {
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
  (email: string, password: string) => async (dispatch: any) => {
    dispatch(setLoading());

    try {
      await api.post("auth/login", { email, password });

      const response = await api.get("auth/users/me");

      dispatch(setUser(response.data));
    } catch (error) {
      dispatch(setError("Невірний емейл або пароль"));
    }
  };
