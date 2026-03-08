import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { isAnyOf } from '@reduxjs/toolkit'
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
  expenseId: number,
  error: string | null,
  currentExpense: Expense | null
}

const ExpenseInitialState: ExpenseState = {
  expenses: [],
  isRefreshing: false,
  expenseId: 0,
  error: null,
  currentExpense: null
}


const ExpenseSlice = createSlice({
  name: 'expense',
  initialState: ExpenseInitialState,
  reducers: {
    SelectIdExpense(state, action) {
      state.expenseId = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(AddExpense.fulfilled, (state, action: PayloadAction<Expense>) => {
        state.expenses.push(action.payload)
      })
      .addCase(GetAllExpenses.fulfilled, (state, action: PayloadAction<Expense[]>) => {
        state.expenses = action.payload
      })
      .addCase(GetExpenseById.fulfilled, (state, action) => {
        state.currentExpense = action.payload
      })
      .addCase(DeleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(expense => expense.id !== action.payload)
      })
      .addCase(GetExpensesByCategory.fulfilled, (state, action) => {
        state.expenses = action.payload
      })
      .addCase(ClearAllExpense.fulfilled, state => {
        state.expenses = []
      })
      .addCase(SetAmountExpense.fulfilled, (state, action) => {
        const expense = state.expenses.find(expense => expense.id === action.payload.id)
        if (expense) {
          expense.amount = action.payload.amount
        }
      })
      .addMatcher(
        isAnyOf(
          AddExpense.pending,
          GetAllExpenses.pending,
          GetExpenseById.pending,
          DeleteExpense.pending,
          GetExpensesByCategory.pending,
          ClearAllExpense.pending,
          SetAmountExpense.pending,
        ),
        state => {
          state.isRefreshing = true
          state.error = null
        }
      )
      .addMatcher(
        isAnyOf(
          AddExpense.rejected,
          GetAllExpenses.rejected,
          GetExpenseById.rejected,
          DeleteExpense.rejected,
          GetExpensesByCategory.rejected,
          ClearAllExpense.rejected,
          SetAmountExpense.rejected,
        ),
        (state, action) => {
          state.isRefreshing = false
          state.error = action.payload as string
        }
      )
      .addMatcher(
        isAnyOf(
          AddExpense.fulfilled,
          GetAllExpenses.fulfilled,
          GetExpenseById.fulfilled,
          DeleteExpense.fulfilled,
          GetExpensesByCategory.fulfilled,
          ClearAllExpense.fulfilled,
          SetAmountExpense.fulfilled,
        ),
        state => {
          state.isRefreshing = false
        }
      )
  },
})

export const { SelectIdExpense } = ExpenseSlice.actions

export const ExpenseReducer = ExpenseSlice.reducer
