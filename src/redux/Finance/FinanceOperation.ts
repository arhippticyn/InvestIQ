import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/api'

export type Finance = {
  id: number
  description: string
  amount: number
  date: string
  category_id: number
  is_active: boolean
}

export type FinanceType = 'incomes' | 'expense'
export type FinanceCreate = Omit<Finance, 'id' | 'is_active'>

export const AddFinance = createAsyncThunk<Finance, { finance: FinanceCreate; type: FinanceType }>(
  'finance/add',
  async ({ finance, type }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/finances/${type}`, finance);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.detail || 'Помилка при створенні');
    }
  }
);

export const GetAllFinances = createAsyncThunk<Finance[], FinanceType>(
  'finance/getAll',
  async (type, { rejectWithValue }) => {
    try {
      const response = await api.get(`/finances/${type}`)
      return response.data
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.detail || 'Помилка завантаження');
    }
  }
)

export const GetFinanceById = createAsyncThunk<Finance, { id: number; type: FinanceType }>(
  'finance/getById',
  async ({ id, type }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/finances/${type}/${id}`)
      return response.data
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.detail || 'Не знайдено');
    }
  }
)

export const SetAmountFinance = createAsyncThunk<Finance, { id: number; new_amount: number; type: FinanceType }>(
  'finance/setAmount',
  async ({ id, new_amount, type }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/finances/${type}/${id}`, { new_amount })
      return response.data
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.detail || 'Помилка оновлення');
    }
  }
)

export const DeleteFinance = createAsyncThunk<number, { id: number; type: FinanceType }>(
  'finance/delete',
  async ({ id, type }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/finances/${type}/${id}`)
      return response.data
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.detail || 'Помилка видалення');
    }
  }
)

export const ClearAllFinances = createAsyncThunk<{ message: string }, FinanceType>(
  'finance/clearAll',
  async (type, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/finances/${type}/clear`)
      return response.data
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.detail || 'Помилка очищення');
    }
  }
)

export const GetFinanceByCategory = createAsyncThunk<Finance[], { type: FinanceType }>(
  'finance/getByCategory',
  async ({ type }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/finances/category/${type}`)
      return response.data
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.detail || 'Помилка за категорією');
    }
  }
)