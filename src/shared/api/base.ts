import axios, { type AxiosRequestConfig, AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { authTokenModel } from 'entities/session/model/sessionStorage'

const apiUrl = import.meta.env.VITE_API_URL

if (!apiUrl) {
  throw new Error('VITE_API_URL is not defined')
}

const getHeaders = (): Record<string, string> => {
  return {
    'Content-Type': 'application/json',
  }
}


export type ResponseErrorBody = {
  message: string
  system: boolean
  isSystem?: boolean
  response?: {
    data?: {
      error?: {
        message: string
      }
    }
  }
}

export const instance = axios.create({
  baseURL: apiUrl,
  responseType: 'json',
  headers: getHeaders(),
})

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = authTokenModel.getAccessToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: { message?: string } }>) => {
    const fallbackMessage = 'Произошла ошибка при выполнении запроса'

    const normalizedError: ResponseErrorBody = {
      message:
        error.response?.data?.error?.message ??
        error.response?.data?.message ??
        error.message ??
        fallbackMessage,
      system: !error.response,
      isSystem: !error.response,
      response: {
        data: {
          error: {
            message:
              error.response?.data?.error?.message ??
              error.response?.data?.message ??
              error.message ??
              fallbackMessage,
          },
        },
      },
    }

    return Promise.reject(normalizedError)
  },
)

export type ApiParams = {
  url: string
  params?: Record<string, unknown>
} & Pick<AxiosRequestConfig, 'headers' | 'signal' | 'responseType'>

export type ApiBodyParams<TBody = unknown> = {
  url: string
  body?: TBody
} & Pick<AxiosRequestConfig, 'headers' | 'signal' | 'responseType'>

export const apiGet = async <T>({
                                  url,
                                  params,
                                  headers,
                                  signal,
                                  responseType,
                                }: ApiParams): Promise<T> => {
  const response = await instance.get<T>(url, {
    params,
    headers,
    signal,
    responseType,
  })

  return response.data
}

export const apiPost = async <TResponse, TBody = unknown>({
                                                            url,
                                                            body,
                                                            headers,
                                                            signal,
                                                            responseType,
                                                          }: ApiBodyParams<TBody>): Promise<TResponse> => {
  const response = await instance.post<TResponse>(url, body, {
    headers,
    signal,
    responseType,
  })

  return response.data
}

export const apiPut = async <TResponse, TBody = unknown>({
                                                           url,
                                                           body,
                                                           headers,
                                                           signal,
                                                           responseType,
                                                         }: ApiBodyParams<TBody>): Promise<TResponse> => {
  const response = await instance.put<TResponse>(url, body, {
    headers,
    signal,
    responseType,
  })

  return response.data
}

export const apiPatch = async <TResponse, TBody = unknown>({
                                                             url,
                                                             body,
                                                             headers,
                                                             signal,
                                                             responseType,
                                                           }: ApiBodyParams<TBody>): Promise<TResponse> => {
  const response = await instance.patch<TResponse>(url, body, {
    headers,
    signal,
    responseType,
  })

  return response.data
}

export const apiDelete = async <T>({
                                     url,
                                     headers,
                                     signal,
                                     responseType,
                                   }: Omit<ApiParams, 'params'>): Promise<T> => {
  const response = await instance.delete<T>(url, {
    headers,
    signal,
    responseType,
  })

  return response.data
}
