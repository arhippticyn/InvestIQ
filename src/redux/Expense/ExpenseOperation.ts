import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/api'

export type Expense = {
  id: number
  description: string
  amount: number
  date: string   
  category_id: number
  is_active: boolean
}

export type ExpenseCreate = Omit<Expense, 'id' | 'is_active'>

export const AddExpense = createAsyncThunk<Expense, ExpenseCreate>(
  'expense/AddExpire',
  async (expense: ExpenseCreate, { rejectWithValue }) => {
    try {
      const response = await api.post('/finances/expense', expense)

      return response.data
    } catch (e) {
      return rejectWithValue('Створення витрати не успішна')
    }
  }
)

export const GetAllExpenses = createAsyncThunk<Expense[]>(
  'expense/GetAllExpenses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/finances/expense')

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
      const response = await api.get(`/finances/expense/${id}`)

      return response.data
    } catch (e) {
      return rejectWithValue('Отримання витрат неуспішна')
    }
  }
)

export const SetAmountExpense = createAsyncThunk<Expense, { id: number; new_amount: number }>(
  'expense/SetAmountExpense',
  async (
    { id, new_amount }: { id: number; new_amount: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`/finances/expense/${id}`, {
        amount: new_amount,
      })

      return response.data
    } catch (e) {
      return rejectWithValue('Змінення ціни витрати неуспішна')
    }
  }
)

export const DeleteExpense = createAsyncThunk<number, number>(
  'expense/DeleteExpense',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/finances/expense/${id}`)

      return response.data
    } catch (e) {
      return rejectWithValue('Видалення витрати неуспішна')
    }
  }
)

export const ClearAllExpense = createAsyncThunk<void, void>(
  'expense/ClearAllExpense',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete('/finances/expense/clear')

      return response.data
    } catch (e) {
      return rejectWithValue('Очищення витрат неуспішна')
    }
  }
)

export const GetExpensesByCategory = createAsyncThunk<Expense[], number>(
  'expense/GetExpensesByCategory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/finances/category/expense')

      return response.data
    } catch (e) {
      return rejectWithValue('Отримання витрат за категорією неуспішен')
    }
  }
)
