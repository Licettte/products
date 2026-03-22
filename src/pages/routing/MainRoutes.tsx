import { lazy } from 'react'
import { Route } from 'react-router-dom'

import { ProtectedRoute } from './ProtectedRoute'

const Main = lazy(async () => await import('../main'))

export const MainRoutes = (
  <Route
    index
    element={
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    }
  />
)
