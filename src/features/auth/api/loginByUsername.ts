import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionStorageModel } from 'entities/session/model/sessionStorage'
import type { ResponseErrorBody } from 'shared/api/base'
import { authEndpoints } from 'features/auth/api/authEnpoints'
import { LoginResponse } from 'entities/auth/model/types'

type LoginByUsernameArgs = {
  username: string
  password: string
  remember: boolean
}

export const loginByUsername = createAsyncThunk<
  LoginResponse,
  LoginByUsernameArgs,
  { rejectValue: string }
>('auth/loginByUsername', async ({ username, password, remember }, thunkApi) => {
  try {
    const payload = await authEndpoints.login({
      username,
      password,
      expiresInMins: 60,
    })

    sessionStorageModel.save({
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      remember,
    })

    return payload
  } catch (error) {
    const err = error as ResponseErrorBody

    return thunkApi.rejectWithValue(
      err?.response?.data?.error?.message ??
      err?.message ??
      'Не удалось выполнить вход',
    )
  }
})
