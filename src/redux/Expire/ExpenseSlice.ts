import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {
  AddExpense,
  ClearAllExpense,
  DeleteExpense,
  GetAllExpenses,
  GetExpenseById,
  GetExpensesByCategory,
  SetAmountExpense,
  type Expense,
} from './ExpenseOperation'

type ExpenseState = {
  expenses: Expense[]
  isRefreshing: boolean
  expenseId: number | null
  error: string | null,
  currentExpense: Expense | null
}

const ExpenseInitialState: ExpenseState = {
  expenses: [],
  isRefreshing: false,
  expenseId: null,
  error: null,
  currentExpense: null
}

const ExpenseSlice = createSlice({
  name: 'expense',
  initialState: ExpenseInitialState,

  extraReducers: builder => {
    builder
      .addCase(AddExpense.pending, state => {
        state.isRefreshing = true
      })
      .addCase(
        AddExpense.fulfilled,
        (state, action: PayloadAction<Expense>) => {
          state.isRefreshing = false
          state.expenses.push(action.payload)
        }
      )
      .addCase(AddExpense.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
      .addCase(GetAllExpenses.pending, state => {
        state.isRefreshing = true
      })
      .addCase(
        GetAllExpenses.fulfilled,
        (state, action: PayloadAction<Expense[]>) => {
          state.isRefreshing = false
          state.expenses = action.payload
        }
      )
      .addCase(GetAllExpenses.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
      .addCase(GetExpenseById.pending, state => {
        state.isRefreshing = true
      })
      .addCase(GetExpenseById.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.currentExpense = action.payload
      })
      .addCase(GetExpenseById.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
      .addCase(DeleteExpense.pending, state => {
        state.isRefreshing = true
      })
      .addCase(DeleteExpense.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.expenses = state.expenses.filter(
          expense => expense.id !== action.payload
        )
      })
      .addCase(DeleteExpense.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
      .addCase(GetExpensesByCategory.pending, state => {
        state.isRefreshing = true
      })
      .addCase(GetExpensesByCategory.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.expenses = action.payload
      })
      .addCase(GetExpensesByCategory.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
      .addCase(ClearAllExpense.pending, state => {
        state.isRefreshing = true
      })
      .addCase(ClearAllExpense.fulfilled, state => {
        state.isRefreshing = false
        state.expenses = []
      })
      .addCase(ClearAllExpense.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
      .addCase(SetAmountExpense.pending, state => {
        state.isRefreshing = true
      })
      .addCase(SetAmountExpense.fulfilled, (state, action) => {
        state.isRefreshing = false
        const expense = state.expenses.find(
          expense => expense.id === action.payload.id
        )
        if (expense) {
          expense.amount = action.payload.amount
        }
      })
      .addCase(SetAmountExpense.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
  },
})

export const ExpenseReducer = ExpenseSlice.reducer
