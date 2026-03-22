import { selectIsAuth } from 'features/auth/model/selectors'
import type { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { APP_ROUTES } from 'shared/config/appRoutes'
import { useAppSelector } from 'shared/lib/hooks/typedRedux'

type ProtectedRouteProps = {
  children: ReactElement
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = useAppSelector(selectIsAuth)
  const location = useLocation()

  if (!isAuth) {
    return <Navigate to={APP_ROUTES.LOGIN} replace state={{ from: location }} />
  }

  return children
}
