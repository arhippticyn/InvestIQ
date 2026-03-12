import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const getBudget = createAsyncThunk<number, void>(
    'budget/get', async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/profile/budget')

            return res.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateBudget = createAsyncThunk<number, number>(
    'budget/update',
    async (budget, { rejectWithValue }) => {
        try {
            const res = await api.patch('/profile/budget', budget)

            return res.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)