import { createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import { RootLayout, DashboardLayout, DashboardSlUsersLayout, DashboardSLClassLayout, DashboarProfileLayout } from "./layouts";
import { Home, Signup, Login, Forgot, ResetPassword, Dashboard, DashboarProfileSettings, DashboardUserDiscordOverview, DashboardServerDiscordOverview, DashboardTextChannelOverview, DashboardVoiceChannelOverview, DashboardUserSlOverview, DashboardWalletSlOverview, DashboardSlPersonnelClassOverview, DashboardUsersDiscordOverview, DashboardTextChannelsOverview, DashboardUsersSlKillsOverview, DashboardUsersSlTimeOverview, DashboardUsersSlShotsOverview, DashboardSlMtfClassOverview, DashboardSlChaosClassOverview, DashboardSlScpClassOverview, DashboardUsersSlWalletsOverview, DashboardUsersSlJumpsOverview, NotFound, DashboardConnect, DashboardIgnoreDNT } from "./pages";
import { useAuthContext } from './hooks/useAuthContext'
import { useDiscordAuthContext } from './hooks/useDiscordAuthContext'
import { useSteamAuthContext } from "./hooks/useSteamAuthContext";

const personnelImage: any = ['../../../assets/class/ClassD.svg', '../../../assets/class/Scientist.svg', '../../../assets/class/Security.svg']
const mtfImage: any = ['../../../assets/class/MTF_1.svg', '../../../assets/class/MTF_1.svg', '../../../assets/class/MTF_1.svg' , '../../../assets/class/MTF_1.svg']
const chaosImage: any = ['../../../assets/class/Chaos_1.svg', '../../../assets/class/Chaos_1.svg','../../../assets/class/Chaos_1.svg','../../../assets/class/Chaos_1.svg',]
const scpImage: any = ['../../../assets/class/SCP-173.svg', '../../../assets/class/SCP-106.svg', '../../../assets/class/SCP-096.svg', '../../../assets/class/SCP-049.svg', '../../../assets/class/SCP-049-2.svg', '../../../assets/class/SCP-3114.svg', '../../../assets/class/SCP-079.svg', '../../../assets/class/SCP-939.svg']

const App = () => {
  const { user } = useAuthContext()
  const { discordUser } = useDiscordAuthContext()
  const { steamUser } = useSteamAuthContext()

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
          path: '/dashboard/overview',
          element: user ? <Dashboard /> : <Navigate to="/" />
        },
        {
          path: '/dashboard/profile',
          element:  user ? <DashboarProfileLayout /> : <Navigate to="/" />,
          children: [
            {
              path: '/dashboard/profile/settings',
              element:  user ? <DashboarProfileSettings /> : <Navigate to="/" />,
            },
            {
              path: '/dashboard/profile/connect',
              element:  user ? <DashboardConnect /> : <Navigate to="/" />,
            },
            {
              path: '/dashboard/profile/ignorednt',
              element:  user && steamUser ? <DashboardIgnoreDNT /> : <Navigate to="/dashboard/profile/connect" />,
            }
          ]
        },
        {
          path: '/dashboard/sl/user',
          element: user && steamUser ? <DashboardUserSlOverview />  : <Navigate to="/dashboard/profile/connect" />
        },
        {
          path: '/dashboard/sl/wallet',
          element: user && steamUser ? <DashboardWalletSlOverview />  : <Navigate to="/dashboard/profile/connect" />
        },
        {
          path: '/dashboard/sl/class',
          element: user && steamUser ? <DashboardSLClassLayout/>  : <Navigate to="/dashboard/profile/connect" />,
          children: [
            {
              path: '/dashboard/sl/class/personnel',
              element: user && steamUser ? <DashboardSlPersonnelClassOverview  classImage={personnelImage}/>  : <Navigate to="/dashboard/profile/connect" />,
            },
            {
              path: '/dashboard/sl/class/mtf',
              element: user && steamUser ? <DashboardSlMtfClassOverview classImage={mtfImage}/>  : <Navigate to="/dashboard/profile/connect" />,
            },
            {
              path: '/dashboard/sl/class/chaos',
              element: user && steamUser ? <DashboardSlChaosClassOverview  classImage={chaosImage}/>  : <Navigate to="/dashboard/profile/connect" />,
            },
            {
              path: '/dashboard/sl/class/scp',
              element: user && steamUser ? <DashboardSlScpClassOverview classImage={scpImage}/> : <Navigate to="/dashboard/profile/connect" />,
            },
          ]
        },
        {
          path: '/dashboard/discord/user',
          element: user && discordUser ? <DashboardUserDiscordOverview /> : <Navigate to="/dashboard/profile/connect" />
        },
        {
          path: '/dashboard/discord/server',
          element: user && discordUser ? <DashboardServerDiscordOverview /> : <Navigate to="/dashboard/profile/connect" />
        },
        {
          path: '/dashboard/discord/text',
          element: user && discordUser ? <DashboardTextChannelOverview /> : <Navigate to="/dashboard/profile/connect" />
        },
        {
          path: '/dashboard/discord/voice',
          element: user && discordUser ? <DashboardVoiceChannelOverview /> : <Navigate to="/dashboard/profile/connect" />
        },
        {
          path: '/dashboard/overview/users-discord',
          element: user && discordUser ? <DashboardUsersDiscordOverview /> : <Navigate to="/dashboard/profile/connect" />
        },
        {
          path: '/dashboard/overview/text',
          element: user && discordUser ? <DashboardTextChannelsOverview /> : <Navigate to="/dashboard/profile/connect" />
        },
        {
          path: '/dashboard/overview/users-sl',
          element: user && steamUser ? <DashboardSlUsersLayout /> : <Navigate to="/dashboard/profile/connect" />,
          children: [
            {
                path: '/dashboard/overview/users-sl/time',
                element: user && steamUser ? <DashboardUsersSlTimeOverview /> : <Navigate to="/dashboard/profile/connect" />
            },
            {
              path: '/dashboard/overview/users-sl/kills',
              element: user && steamUser? <DashboardUsersSlKillsOverview /> : <Navigate to="/dashboard/profile/connect" />
            },
            {
              path: '/dashboard/overview/users-sl/shots',
              element: user && steamUser? <DashboardUsersSlShotsOverview /> : <Navigate to="/dashboard/profile/connect" />
            },
            {
              path: '/dashboard/overview/users-sl/jumps',
              element: user && steamUser? <DashboardUsersSlJumpsOverview /> : <Navigate to="/dashboard/profile/connect" />
            },
          ]
        },
        {
          path: '/dashboard/overview/wallets-sl',
          element: user && discordUser ? <DashboardUsersSlWalletsOverview/> : <Navigate to="/dashboard/profile/connect" />
        }
      ]
    },
    {
      path: '*',
          element: <NotFound /> 
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
