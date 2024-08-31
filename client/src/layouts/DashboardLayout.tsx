import { Outlet } from 'react-router-dom'
import { DashboardNavbar } from '../components'

const DashboardLayout = () => {
  return (
    <div className='gradient__bg overflow-hidden min-h-[100vh]'>
      <DashboardNavbar /> 
      <main className='flex justify-center sm:justify-start'>
          <Outlet/>
      </main>
    </div>
  )
}

export default DashboardLayout
