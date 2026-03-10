import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth/AuthSlice'
import { ExpenseReducer } from './Expense/ExpenseSlice'
import { CategoryReducer } from './Category/CategorySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: ExpenseReducer,
    category: CategoryReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
