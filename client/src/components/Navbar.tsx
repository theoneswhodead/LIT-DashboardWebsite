import { useState} from 'react'

import { NavLink } from 'react-router-dom'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {

  const { user } = useAuthContext()
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const { logout } = useLogout();

    const handleClick = () => {
        logout();
    }


  return (
    <div className='flex justify-between p-6 sm:p-[40px] lg:px-[80px] '>
        <div className='w-[110px] lg:w-[210px] '>
            <NavLink to="/"> 
              <p className='text-white font-barlow_condensed uppercase border-[1px] p-2 border-white lg:text-[32px]'>Lux In <span className='text-dark_red'>Tenebris</span></p>
            </NavLink>
        </div>
        <div className='text-white sm:flex w-[550px] items-center justify-between hidden'>
            <nav className='flex gap-[33px] sm:text-[16px]'>
                <NavLink to="#what" className="hover:text-dark_red hover_animate tracking-wide ">Co nowego</NavLink>
                <NavLink to="#about" className="hover:text-dark_red hover_animate tracking-wide">O nas</NavLink>
                <NavLink to="#history" className="hover:text-dark_red hover_animate tracking-wide">Historia</NavLink>
            </nav>

            <div className='flex items-center reflect text-[16px] gap-[33px]'>
            {
                        user ? (
                            <div className='flex gap-[8px] hover_animate'>
                              <NavLink to="/dashboard" className='text-'>{user.username}</NavLink> 
                              <button className='text-white hover:text-dark_red' onClick={handleClick}>Wyloguj <span className='text-dark_red inline-block font-bold '>Się</span></button> 
                            </div>
                        )  : (
                            <NavLink to="/login" className="hover_animate ">
                                Zaloguj <span className='text-dark_red inline-block font-bold '>Się</span>
                            </NavLink>
                        ) 
                     }
            </div>

        </div>
        <div className='flex flex-col justify-end items-end sm:hidden'>
        {toggleMenu
          ? <RiCloseLine color="#fff" size={30} onClick={()=> setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={30} onClick={()=> setToggleMenu(true)} />
        }
        {
            toggleMenu && 
            <nav className='text-white text-[16px] flex flex-col absolute bg-dark_opacity inset-0 top-[89px] backdrop-blur-[70px] left-1/3 gap-[33px] p-6 sm:hidden z-10'>
                <NavLink to="#what" className="hover:text-dark_red hover_animate tracking-wide">Co nowego</NavLink>
                <NavLink to="#about" className="hover:text-dark_red hover_animate tracking-wide">O nas</NavLink>
                <NavLink to="#history" className="hover:text-dark_red hover_animate tracking-wide">Historia</NavLink>
                <NavLink to="/login" className="hover_animate">Zaloguj <span className='text-dark_red inline-block font-bold '>Się</span></NavLink>
            </nav>
        }
        </div>
    </div>
  )
}

export default Navbar
