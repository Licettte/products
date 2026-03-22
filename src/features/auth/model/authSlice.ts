import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { sessionStorageModel } from 'entities/session/model/sessionStorage'

import type { LoginSchema } from 'entities/auth/model/types'
import { loginByUsername } from 'features/auth/model/thunks'
import { initAuth } from 'features/auth/model/initAuth'

const initialState: LoginSchema = {
  username: '',
  password: '',
  remember: false,
  isLoading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  isAuth: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload
      state.error = null
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
      state.error = null
    },
    setRemember(state, action: PayloadAction<boolean>) {
      state.remember = action.payload
    },
    logout(state) {
      sessionStorageModel.clear()
      state.accessToken = null
      state.refreshToken = null
      state.isAuth = false
      state.username = ''
      state.password = ''
      state.error = null
      state.remember = false
    },
    clearAuthError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginByUsername.fulfilled, (state, action) => {
        state.isLoading = false
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.isAuth = true
        state.password = ''
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? 'Ошибка авторизации'
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        if (!action.payload) {
          return
        }

        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.remember = action.payload.remember
        state.isAuth = true
      })
  },
})

export const {
  setUsername,
  setPassword,
  setRemember,
  logout,
  clearAuthError,
} = authSlice.actions

export const authReducer = authSlice.reducer
