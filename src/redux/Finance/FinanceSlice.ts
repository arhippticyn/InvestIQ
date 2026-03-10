import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { isAnyOf } from '@reduxjs/toolkit'
import {
  AddFinance,
  ClearAllFinances,
  DeleteFinance,
  GetAllFinances,
  GetFinanceById,
  GetFinanceByCategory,
  SetAmountFinance,
  type Finance,
} from './FinanceOperation'

type FinanceState = {
  finances: Finance[]
  isRefreshing: boolean
  financeId: number,
  error: string | null,
  currentFinance: Finance | null
}

const FinanceSliceInitialState: FinanceState = {
  finances: [],
  isRefreshing: false,
  financeId: 0,
  error: null,
  currentFinance: null
}


const FinanceSlice = createSlice({
  name: 'finance',
  initialState: FinanceSliceInitialState,
  reducers: {
    SelectIdExpense(state, action) {
      state.financeId = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(AddFinance.fulfilled, (state, action: PayloadAction<Finance>) => {
        state.finances.push(action.payload)
      })
      .addCase(GetAllFinances.fulfilled, (state, action: PayloadAction<Finance[]>) => {
        state.finances = action.payload
      })
      .addCase(GetFinanceById.fulfilled, (state, action) => {
        state.currentFinance = action.payload
      })
      .addCase(DeleteFinance.fulfilled, (state, action) => {
        state.finances = state.finances.filter(finance => finance.id !== action.payload)
      })
      .addCase(GetFinanceByCategory.fulfilled, (state, action) => {
        state.finances = action.payload
      })
      .addCase(ClearAllFinances.fulfilled, state => {
        state.finances = []
      })
      .addCase(SetAmountFinance.fulfilled, (state, action) => {
        const finance = state.finances.find(finance => finance.id === action.payload.id)
        if (finance) {
          finance.amount = action.payload.amount
        }
      })
      .addMatcher(
        isAnyOf(
          AddFinance.pending,
          GetAllFinances.pending,
          GetFinanceById.pending,
          DeleteFinance.pending,
          GetFinanceByCategory.pending,
          ClearAllFinances.pending,
          SetAmountFinance.pending,
        ),
        state => {
          state.isRefreshing = true
          state.error = null
        }
      )
      .addMatcher(
        isAnyOf(
          AddFinance.rejected,
          GetAllFinances.rejected,
          GetFinanceById.rejected,
          DeleteFinance.rejected,
          GetFinanceByCategory.rejected,
          ClearAllFinances.rejected,
          SetAmountFinance.rejected,
        ),
        (state, action) => {
          state.isRefreshing = false
          state.error = action.payload as string
        }
      )
      .addMatcher(
        isAnyOf(
          AddFinance.fulfilled,
          GetAllFinances.fulfilled,
          GetFinanceById.fulfilled,
          DeleteFinance.fulfilled,
          GetFinanceByCategory.fulfilled,
          ClearAllFinances.fulfilled,
          SetAmountFinance.fulfilled,
        ),
        state => {
          state.isRefreshing = false
        }
      )
  },
})

export const { SelectIdExpense } = FinanceSlice.actions

export const FinanceReducer = FinanceSlice.reducer
