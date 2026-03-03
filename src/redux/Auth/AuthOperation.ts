import { api } from '../../api/api'
import { createAsyncThunk } from '@reduxjs/toolkit'

type User = {
  email: string
  password: string
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', user)

      return response.data
    } catch (e) {
      return rejectWithValue('Реєстрація неуспішна, повторіть спробу пізніше')
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', user)

      return response.data
    } catch (e) {
      return rejectWithValue('Вхід неуспішний, повторіть спробу пізніше')
    }
  }
)

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/profile/me')

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)

export const getNewRefresh = createAsyncThunk(
  'auth/getNewRefresh',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/refresh')

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)
