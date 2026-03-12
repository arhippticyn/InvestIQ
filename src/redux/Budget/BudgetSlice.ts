import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getBudget, updateBudget } from "./BudgetOperations";

type BudgetState = {
    budget: number
    isRefreshing: boolean,
    error: string | null,
}

const BudgetInitialState: BudgetState = {
    budget: 0,
    isRefreshing: false,
    error: null,
}

export const budgetSlice = createSlice({
    name: 'budget',
    initialState: BudgetInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBudget.fulfilled, (state, action: PayloadAction<number>) => {
            state.budget = action.payload
        })
        builder.addCase(updateBudget.fulfilled, (state, action: PayloadAction<number>) => {
            state.budget = action.payload
        })

        builder
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.isRefreshing = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.isRefreshing = false;
                    state.error = (action as PayloadAction<string | undefined>).payload || "Error";
                }
            );
    }
})


export const budgetReducer = budgetSlice.reducer