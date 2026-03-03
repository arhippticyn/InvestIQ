import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const GetAllCategory = createAsyncThunk('category/GetAllCategory', (async (_, {rejectWithValue}) => {
    try {
        const response = await api.get('/category')

        return response.data
    } catch(e) {
        return rejectWithValue('Отримання категорій неуспішна')
    }
}))