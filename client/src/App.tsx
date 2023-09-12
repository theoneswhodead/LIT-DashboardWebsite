import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import { RootLayout, DashboardLayout } from "./layouts";
import { Home, Signup, Login, Forgot, ResetPassword, Dashboard} from "./pages";

import { useAuthContext } from './hooks/useAuthContext'

const ConditionalRoute = () => {
  const { user } = useAuthContext()
  return user ? <Dashboard /> : <Navigate to="/" />
}

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/signup',
          element: <Signup />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/forgot',
          element: <Forgot />
        },
        {
          path: 'reset-password/:id/:token',
          element: <ResetPassword />
        }
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: '/dashboard',
          element: <ConditionalRoute />
        }
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
