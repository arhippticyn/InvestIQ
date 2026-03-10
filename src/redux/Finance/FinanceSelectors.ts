import type { RootState } from '../store'

export const selectFinances = (state: RootState) => state.finance.finances
export const selectCurrentFinancee = (state: RootState) => state.finance.currentFinance
export const selectFinanceId = (state: RootState) => state.finance.financeId
export const selectIsRefreshing = (state: RootState) => state.finance.isRefreshing
export const selectError = (state: RootState) => state.finance.error
