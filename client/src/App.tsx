import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import { RootLayout, DashboardLayout } from "./layouts";
import { Home, Signup, Login, Forgot, ResetPassword, Dashboard, DashboardProfile, DashboardUserDiscordOverview, DashboardServerDiscordOverview, DashboardTextChannelOverview, DashboardVoiceChannelOverview} from "./pages";
import { useAuthContext } from './hooks/useAuthContext'
import { useDiscordAuthContext } from './hooks/useDiscordAuthContext'

const App = () => {
  console.log('app')
  const { user } = useAuthContext()
  const { discordUser } = useDiscordAuthContext()

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
          element: user ? <Navigate to="/" /> : <Signup />
        },
        {
          path: '/login',
          element: user ? <Navigate to="/" /> : <Login />
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
          element: user ? <Dashboard /> : <Navigate to="/" />
        },
        {
          path: '/dashboard/profile',
          element:  user ? <DashboardProfile /> : <Navigate to="/" />
        },
        {
          path: '/dashboard/user-discord-overview',
          element: user && discordUser ? <DashboardUserDiscordOverview /> : <Navigate to="/" />
        },
        {
          path: '/dashboard/server-discord-overview',
          element: user && discordUser ? <DashboardServerDiscordOverview /> : <Navigate to="/" />
        },
        {
          path: '/dashboard/text-channel-overview',
          element: user && discordUser ? <DashboardTextChannelOverview /> : <Navigate to="/" />
        },
        {
          path: '/dashboard/voice-channel-overview',
          element: user && discordUser ? <DashboardVoiceChannelOverview /> : <Navigate to="/" />
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
