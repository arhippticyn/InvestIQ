import type { RootState } from '../store'

export const selectCategories = (state: RootState) => state.category.categories
export const selectCategoryId = (state: RootState) => state.category.categoriesId
export const selectIsRefreshing = (state: RootState) => state.category.isRefreshing