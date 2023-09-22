import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  console.log('RootLayout  ')
  return (
      <main>
        <Outlet/>
      </main>
  )
}

export default RootLayout