import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { APP_ROUTES } from 'shared/config/appRoutes'
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/typedRedux'

import { clearAuthError, setPassword, setRemember, setUsername } from '../authSlice'
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthPassword,
  selectAuthRemember,
  selectAuthUsername,
} from '../selectors'
import { loginByUsername } from '../thunks'

type LoginFieldErrors = {
  username?: string
  password?: string
}

const getValidationErrors = (username: string, password: string): LoginFieldErrors => {
  const errors: LoginFieldErrors = {}

  if (!username.trim()) {
    errors.username = 'Введите логин'
  }

  if (!password.trim()) {
    errors.password = 'Введите пароль'
  }

  return errors
}

export const useLoginForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const username = useAppSelector(selectAuthUsername)
  const password = useAppSelector(selectAuthPassword)
  const remember = useAppSelector(selectAuthRemember)
  const isLoading = useAppSelector(selectAuthLoading)
  const apiError = useAppSelector(selectAuthError)

  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({})
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const formError = useMemo(() => apiError ?? '', [apiError])

  const clearFieldError = useCallback((field: keyof LoginFieldErrors) => {
    setFieldErrors((prev) => {
      if (!prev[field]) {
        return prev
      }

      return {
        ...prev,
        [field]: undefined,
      }
    })
  }, [])

  const handleUsernameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      clearFieldError('username')
      dispatch(setUsername(event.target.value))
    },
    [clearFieldError, dispatch],
  )

  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      clearFieldError('password')
      dispatch(setPassword(event.target.value))
    },
    [clearFieldError, dispatch],
  )

  const handleRememberChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(setRemember(event.target.checked))
    },
    [dispatch],
  )

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev)
  }, [])

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      dispatch(clearAuthError())

      const errors = getValidationErrors(username, password)
      setFieldErrors(errors)

      if (Object.keys(errors).length > 0) {
        return
      }

      const result = await dispatch(
        loginByUsername({
          username: username.trim(),
          password,
          remember,
        }),
      )

      if (loginByUsername.fulfilled.match(result)) {
        navigate(APP_ROUTES.HOME, { replace: true })
      }
    },
    [dispatch, navigate, password, remember, username],
  )

  return {
    username,
    password,
    remember,
    isLoading,
    formError,
    fieldErrors,
    isPasswordVisible,
    handleUsernameChange,
    handlePasswordChange,
    handleRememberChange,
    togglePasswordVisibility,
    handleSubmit,
  }
}
