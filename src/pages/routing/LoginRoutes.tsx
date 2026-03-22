import { AuthPage } from 'pages/auth/AuthPage'
import { Route } from 'react-router-dom'
import { APP_ROUTES } from 'shared/config/appRoutes'

export const LoginRoutes = <Route path={APP_ROUTES.LOGIN} element={<AuthPage />} />
