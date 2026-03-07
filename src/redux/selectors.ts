import type { RootState } from "./store"
import type { IUser } from "../types/user"

export const selectUser = (state: RootState): IUser | null => state.auth.user