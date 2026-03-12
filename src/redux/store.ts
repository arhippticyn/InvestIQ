import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth/AuthSlice'
import { FinanceReducer } from './Finance/FinanceSlice'
import { CategoryReducer } from './Category/CategorySlice'
import { budgetReducer } from './Budget/BudgetSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    finance: FinanceReducer, 
    category: CategoryReducer,
    budget: budgetReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
