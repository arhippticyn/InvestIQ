import type { RootState } from '../../redux/store'

export const selectExpenses = (state: RootState) => state.expense.expenses
export const selectCurrentExpense = (state: RootState) => state.expense.currentExpense
export const selectExpenseId = (state: RootState) => state.expense.expenseId
export const selectIsRefreshing = (state: RootState) => state.expense.isRefreshing
export const selectError = (state: RootState) => state.expense.error