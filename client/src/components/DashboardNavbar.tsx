import { useState} from 'react'
import { NavLink } from "react-router-dom"
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

const DashboardNavbar = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

const MobileSidebar = () => {
  return (
    <div className='flex flex-col justify-center items-end sm:hidden'>
    {toggleMenu
      ? <RiCloseLine color="#fff" size={30} onClick={()=> setToggleMenu(false)} />
      : <RiMenu3Line color="#fff" size={30} onClick={()=> setToggleMenu(true)} />
    }
    {
        toggleMenu && 
        <div className='text-white text-[16px] flex flex-col absolute bg-dark_opacity inset-0 top-[89px] backdrop-blur-[70px] right-1/3 gap-[33px] p-6 sm:hidden z-10'>
            <NavLink to="/dashboard/user-sl-overview" className="hover:text-dark_red hover_animate tracking-wide">Serwer SCP: SL</NavLink>
            <NavLink to="/dashboard/user-discord-overview" className="hover:text-dark_red hover_animate tracking-wide">Użytkownik Discord</NavLink>
            <NavLink to="/dashboard/server-discord-overview" className="hover:text-dark_red hover_animate tracking-wide">Serwer DC</NavLink>
            <NavLink to="/dashboard/textchannel-discord-overview" className="hover:text-dark_red hover_animate tracking-wide">Tekstowe</NavLink>
            <NavLink to="/dashboard/voicechannel-discord-overview" className="hover:text-dark_red hover_animate tracking-wide">Głosowe</NavLink>
        </div>
    }
    </div>
  )
}
  return (
    <div className='flex justify-between items-center p-6 sm:p-[40px] lg:px-[80px] '>
      <MobileSidebar  />
      <div className='w-[110px] lg:w-[210px]'>
        <NavLink to="/">
            <p className='text-white font-barlow_condensed uppercase border-[1px] p-2 border-white lg:text-[32px] '>Lux In <span className='text-dark_red'>Tenebris</span></p>
        </NavLink>
        </div>

        <div className='flex  items-center reflect sm:text-[16px]'>

          <NavLink to="/dashboard/profile" className="flex items-center gap-[8px]">
            <img src="../../assets/user.png" alt="avatar" className='w-[50px] h-[50px]'/>
          </NavLink>
        </div>
    </div>
  )
}

export default DashboardNavbar
