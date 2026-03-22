import { RootState } from 'app/store'

export const selectAuthUsername = (state: RootState) => state.auth.username
export const selectAuthPassword = (state: RootState) => state.auth.password
export const selectAuthRemember = (state: RootState) => state.auth.remember
export const selectAuthLoading = (state: RootState) => state.auth.isLoading
export const selectAuthError = (state: RootState) => state.auth.error
export const selectIsAuth = (state: RootState) => state.auth.isAuth
