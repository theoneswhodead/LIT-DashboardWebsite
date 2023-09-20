import { Outlet } from 'react-router-dom'
import { DashboardNavbar } from '../components'
import { Sidebar } from '../components'

const DashboardLayout = () => {
  return (
    <div className='bg-almost_black lg:h-[100vh] overflow-hidden'>
      <DashboardNavbar />
      
      <main className='flex  justify-center sm:justify-start'>
        <Sidebar />
        <Outlet/>
      </main>
    </div>
  )
}

export default DashboardLayout
