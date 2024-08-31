import { useState} from 'react'
import { NavLink } from "react-router-dom"

const DashboardNavbar = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState('Przegląd')
  const [animate, setAnimate] = useState('dropdown_open')

  const handleSL = async (ms:any) => {
    setSelectedCategory("SCP: SL");
    setAnimate("dropdown_close")
    await new Promise(r => setTimeout(r, ms))
    setToggleMenu(false);
  }
  const handleDiscord = async (ms:any) => {
    setSelectedCategory("Discord");
    setAnimate("dropdown_close")
    await new Promise(r => setTimeout(r, ms))
    setToggleMenu(false);
  }
  const handleAdministration = async (ms:any) => {
    setSelectedCategory("Administracja");
    setAnimate("dropdown_close")
    await new Promise(r => setTimeout(r, ms))
    setToggleMenu(false);
  }
  const handleOverview = async (ms:any) => {
    setSelectedCategory("Przegląd");
    setAnimate("dropdown_close")
    await new Promise(r => setTimeout(r, ms))
    setToggleMenu(false);
  }

  const handleToggleMenu = async (ms:any) => {
    
    if(toggleMenu) {
      
      setAnimate("dropdown_close")
      await new Promise(r => setTimeout(r, ms))
    } else if(!toggleMenu) {
      setAnimate("dropdown_open")
    }

    setToggleMenu((prev) => !prev)
    
  }

  return (
    <div className='p-6 sm:p-[40px] sm:pb-[16px] lg:px-[80px]  w-full  z-20'>
      <div className='flex justify-between items-center pb-6'>
        <div className='w-[66px] lg:w-[66px]'>
            <NavLink to="/">
              <img src="../../Public/logo/gl.png" alt="GoldLegends" />
          </NavLink>
          </div>
          <div className='cursor-pointer relative' onClick={() => handleToggleMenu(900)}> 
              <h3 className='text-white font-bold text-[14px] font-roboto sm:text-[16px]  pb-[35px] uppercase'>{selectedCategory}</h3>
              <span className='arrow_dropdown rotate-45'></span>
          </div>
          <div className='flex items-center sm:text-[16px] '>
            <NavLink to="/dashboard/profile/settings" className="flex items-center gap-[8px]">
              <img src="../../Public//user.png" alt="avatar" className='w-[50px] h-[50px]'/>
            </NavLink>
          </div>
      </div>
      {
        
        <div className={`text-white xs:text-[12px] sm:text-[16px] font-roboto font-bold  ${toggleMenu ? ' flex' : ' hidden'} flex-col xs:flex-row items-center justify-center md:flex-nowrap gap-[16px] xs:gap-[16px] ss:gap-[24px] sm:gap-[33px]`}>
          <NavLink to="/dashboard/discord/user" className={`ss:w-[200px] sm:w-[300px]  relative overflow-hidden  cursor-pointer border_gold ${animate}`}  onClick={()=> handleDiscord(1000)}>
              <img src="../../Public/grafiki/lab.png" alt="" className="zoom"/>
              <p className="absolute bottom-[24px] right-1/2 translate-x-1/2 pointer-events-none dropdown_text">
                Discord</p> 
          </NavLink>
          <NavLink to="/dashboard/sl/user"  className={`ss:w-[200px] sm:w-[300px]  relative overflow-hidden  cursor-pointer border_gold ${animate}`} onClick={()=> handleSL(1000)}>
              <img src="../../Public/grafiki/dor.png" alt="" className="zoom"/>
              <p className="absolute bottom-[24px] right-1/2 translate-x-1/2 pointer-events-none dropdown_text" >SCP: SL</p>
          </NavLink>
          <NavLink to="/dashboard/overview"  className={`ss:w-[200px] sm:w-[300px]  relative overflow-hidden  cursor-pointer border_gold ${animate}`} onClick={()=>handleOverview(1000)}>
              <img src="../../Public/grafiki/mirr.png" alt="" className="zoom"/>
              <p className="absolute bottom-[24px] right-1/2 translate-x-1/2 pointer-events-none dropdown_text" >Przegląd</p>
          </NavLink>
          <NavLink to="/dashboard/administration"  className={`ss:w-[200px] sm:w-[300px]  relative overflow-hidden  cursor-pointer border_gold ${animate}`} onClick={()=>handleAdministration(1000)}>
              <img src="../../Public/grafiki/arrest.png" alt="" className="zoom"/>
              <p className="absolute bottom-[24px] right-1/2 translate-x-1/2 pointer-events-none dropdown_text" >Administracja</p>
          </NavLink>
        </div>

      }

    </div>
  )
}

export default DashboardNavbar
