import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/AuthSlice";
import { ExpenseReducer } from "./Expire/ExpenseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: ExpenseReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
