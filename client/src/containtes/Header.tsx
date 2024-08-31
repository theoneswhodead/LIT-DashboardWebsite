import { NavLink } from "react-router-dom"
import { Link as ScrollLink } from 'react-scroll';
import { useAuthContext } from '../hooks/useAuthContext';


const Header = () => {

  const { user } = useAuthContext()

  return (
    <section className='p-6 sm:p-[40px] lg:p-[80px] mt-[24px] sm:mt-[48px] lg:mt-[96px]'>
      <div className='flex flex-col items-center text-center'>

          <h1 className='font-montserrat font-bold text-[32px] xs:text-[40px] leading-[40px] sm:text-[72px] sm:leading-[72px] lg:text-[96px] lg:leading-[96px]'><span className="header gradient__text" >GoldenLeague</span></h1>

          <h3 className='font-roboto text-white text-[24px] leading-[32px] my-[24px] sm:mt-[48px] lg:mt-[96px]'>Dołącz do nas i przejdź do Złotej Ligi</h3>

          {
            user
            ?
              <ScrollLink to="news" smooth={true} duration={500} className="cursor-pointer">
                <div className='mt-[48px] sm:mt-[96px] lg:mt-[192px] diamond'>
                 <span className="arrow"></span>
                </div>
              </ScrollLink>
            :
            <NavLink to="/signup">
            <div className='mt-[48px] sm:mt-[96px] lg:mt-[192px] diamond'>
                <span className="arrow"></span>
            </div>    
          </NavLink>
          }
          

      </div>
  
</section>
  )
}

export default Header
