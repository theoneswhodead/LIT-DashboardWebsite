import React from 'react'
import { Outlet } from 'react-router-dom'
import { DashboardNavbar } from '../components'
import { Sidebar } from '../components'

const DashboardLayout = () => {
  return (
    <div className='gradient__bg h-[100vmin]'>
      <DashboardNavbar />
      
      <main className='flex'>
        <Sidebar />
        <Outlet/>
      </main>
    </div>
  )
}

export default DashboardLayout
