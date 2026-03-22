const ACCESS_TOKEN_KEY = 'auth_access_token'
const REFRESH_TOKEN_KEY = 'auth_refresh_token'
const REMEMBER_KEY = 'auth_remember'

export type StoredSession = {
  accessToken: string
  refreshToken: string
  remember: boolean
}

const clearStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(REMEMBER_KEY)

  sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  sessionStorage.removeItem(REFRESH_TOKEN_KEY)
  sessionStorage.removeItem(REMEMBER_KEY)
}

export const sessionStorageModel = {
  save(session: StoredSession) {
    clearStorage()

    const storage = session.remember ? localStorage : sessionStorage

    storage.setItem(ACCESS_TOKEN_KEY, session.accessToken)
    storage.setItem(REFRESH_TOKEN_KEY, session.refreshToken)
    storage.setItem(REMEMBER_KEY, String(session.remember))
  },

  get(): StoredSession | null {
    const localAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
    const sessionAccessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY)

    const storage = localAccessToken ? localStorage : sessionAccessToken ? sessionStorage : null

    if (!storage) {
      return null
    }

    const accessToken = storage.getItem(ACCESS_TOKEN_KEY)
    const refreshToken = storage.getItem(REFRESH_TOKEN_KEY)
    const remember = storage.getItem(REMEMBER_KEY) === 'true'

    if (!accessToken || !refreshToken) {
      clearStorage()
      return null
    }

    return {
      accessToken,
      refreshToken,
      remember,
    }
  },

  clear() {
    clearStorage()
  },
}

export const authTokenModel = {
  getAccessToken(): string | null {
    return (
      localStorage.getItem(ACCESS_TOKEN_KEY) ??
      sessionStorage.getItem(ACCESS_TOKEN_KEY)
    )
  },

  getRefreshToken(): string | null {
    return (
      localStorage.getItem(REFRESH_TOKEN_KEY) ??
      sessionStorage.getItem(REFRESH_TOKEN_KEY)
    )
  },
}
