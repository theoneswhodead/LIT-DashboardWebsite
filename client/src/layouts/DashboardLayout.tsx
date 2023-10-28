import { Outlet } from 'react-router-dom'
import { DashboardNavbar } from '../components'
import { Sidebar } from '../components'

const DashboardLayout = () => {
  console.log('DashboardLayout')
  return (
    <div className='bg-almost_black overflow-hidden min-h-[100vh]'>
      <DashboardNavbar />
      
      <main className='flex justify-center sm:justify-start'>
        <Sidebar />
          <Outlet/>
      </main>
    </div>
  )
}

export default DashboardLayout
