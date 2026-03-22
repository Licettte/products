import { apiPost } from 'shared/api/base'
import { LoginRequest, LoginResponse } from 'entities/auth/model/types'

export const authEndpoints = {
  login(body: LoginRequest) {
    return apiPost<LoginResponse, LoginRequest>({
      url: '/auth/login',
      body,
    })
  },
}
