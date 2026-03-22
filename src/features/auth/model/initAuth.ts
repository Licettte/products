import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionStorageModel } from 'entities/session/model/sessionStorage'

export const initAuth = createAsyncThunk('auth/initAuth', async () => {
  return sessionStorageModel.get()
})
