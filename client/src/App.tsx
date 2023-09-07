import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { RootLayout } from "./layouts";
import { Home, Signup, Login} from "./pages";

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
