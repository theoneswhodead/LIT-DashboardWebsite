import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from './../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const DashboardNavbar = () => {

    const { user } = useAuthContext()
    const { logout } = useLogout();

    const handleClick = () => {
        logout();
    }

  return (
    <div className='flex justify-between p-4 sm:p-[40px] lg:px-[80px] '>
      <div className='w-[110px] lg:w-[210px] '>
        <NavLink to="/">
            <p className='text-white font-barlow_condensed uppercase border-[1px] p-2 border-white lg:text-[32px] '>Lux In <span className='text-dark_red'>Tenebris</span></p>
        </NavLink>
        </div>

        <div className='flex gap-[24px] items-center reflect sm:text-[16px]'>
                    {/* <NavLink to="/login" className="hover_animate">Login</NavLink> */}
                     {
                        user ? (
                            <div>
                                
                                <NavLink to="/dashboard" className='text-white'>{user.username}</NavLink> 
                                 

                                <button className='text-white' onClick={handleClick}> Wyloguj się</button> 
                            </div>
                        )  : (
                            <NavLink to="/login" className="hover_animate  ">
                                Zaloguj <span className='text-dark_red inline-block font-bold '>Się</span>
                                </NavLink>
                        ) 
                     }

   
                </div>
    </div>
  )
}

export default DashboardNavbar
