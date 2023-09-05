import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { RootLayout } from "./layouts";
import { Home } from "./pages";

//import Home from './pages/Home'

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
          element: 'signup'
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
