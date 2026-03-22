export type LoginSchema = {
  username: string
  password: string
  remember: boolean
  isLoading: boolean
  error: string | null
  accessToken: string | null
  refreshToken: string | null
  isAuth: boolean
}

export type LoginRequest =  {
  username: string
  password: string
  expiresInMins?: number
}

export type LoginResponse ={
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  accessToken: string
  refreshToken: string
}
