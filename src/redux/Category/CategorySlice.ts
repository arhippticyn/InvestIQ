import { createSlice } from '@reduxjs/toolkit'
import { GetAllCategory } from './CategoryOperation'

type Category = {
  id: number
  name: string
}

type CategoryInitialStateType = {
  categories: Category[]
  categoriesId: number | null
  isRefreshing: boolean
  error: string | null
}

const CategoryInitialState: CategoryInitialStateType = {
  categories: [],
  categoriesId: null,
  isRefreshing: false,
  error: null,
}

const CategorySlice = createSlice({
  name: 'category',
  initialState: CategoryInitialState,
  reducers: {
    SelectId(state, action) {
      state.categoriesId = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(GetAllCategory.pending, state => {
        state.isRefreshing = true
      })
      .addCase(GetAllCategory.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.categories = action.payload
      })
      .addCase(GetAllCategory.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
  },
})

export const { SelectId } = CategorySlice.actions

export const CategoryReducer = CategorySlice.reducer
