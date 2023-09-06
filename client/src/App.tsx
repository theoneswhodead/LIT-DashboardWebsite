import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { RootLayout } from "./layouts";
import { Home, Signup } from "./pages";

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
          element: 'login'
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
