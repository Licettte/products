import { Layout } from 'app/layout'
import { Route, Routes } from 'react-router-dom'
import { APP_ROUTES } from 'shared/config/appRoutes'

import { LoginRoutes } from './LoginRoutes'
import { MainRoutes } from './MainRoutes'
import { NotFoundRoutes } from './NotFoundRoutes'

export const Routing = () => (
  <Routes>
    <Route path={APP_ROUTES.HOME} element={<Layout />}>
      {LoginRoutes}
      {MainRoutes}
      {NotFoundRoutes}
    </Route>
  </Routes>
)
