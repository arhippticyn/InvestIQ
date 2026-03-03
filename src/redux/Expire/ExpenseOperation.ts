import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/api'

type Expense = {
  description: string
  amount: number
  date: Date
  category_id: number
}

export const AddExpense = createAsyncThunk(
  'expense/AddExpire',
  async (expense: Expense, { rejectWithValue }) => {
    try {
      const response = await api.post('/expense', expense)

      return response.data
    } catch (e) {
      return rejectWithValue('Створення витрати не успішна')
    }
  }
)

export const GetAllExpenses = createAsyncThunk(
  'expense/GetAllExpenses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/expense')

      return response.data
    } catch (e) {
      return rejectWithValue('Отримання всіх ваших витрат неуспішна')
    }
  }
)

export const GetExpenseById = createAsyncThunk(
  'expense/GetExpenseById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/ex$pense/${id}`)

      return response.data
    } catch (e) {
      return rejectWithValue('Отримання витрат неуспішна')
    }
  }
)

export const SetAmountExpense = createAsyncThunk(
  'expense/SetAmountExpense',
  async (
    { id, new_amount }: { id: number; new_amount: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`/expense/${id}`, {
        amount: new_amount,
      })

      return response.data
    } catch (e) {
      return rejectWithValue('Змінення ціни витрати неуспішна')
    }
  }
)

export const DeleteExpense = createAsyncThunk(
  'expense/DeleteExpense',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/expense/${id}`)

      return response.data
    } catch (e) {
      return rejectWithValue('Видалення витрати неуспішна')
    }
  }
)

export const CleatAllExpense = createAsyncThunk(
  'expense/CleatAllExpense',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete('/expense/clear')

      return response.data
    } catch (e) {
      return rejectWithValue('Очищення витрат неуспішна')
    }
  }
)

export const GetExpensesByCategory = createAsyncThunk(
  'expense/GetExpensesByCategory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/category/expense')

      return response.data
    } catch (e) {
      return rejectWithValue('Отримання витрат за категорією неуспішен')
    }
  }
)
