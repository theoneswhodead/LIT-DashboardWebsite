import { Navbar, } from '../components'
import { Header, News, AboutUs, OldProjects, Footer } from '../containtes'
import { Link as ScrollLink } from 'react-scroll';
import { useState, } from 'react';
import {  RiCloseLine } from 'react-icons/ri';

const Home = () => {
  const [openOrClose, setOpenOrClose] = useState<string | null>(() => {
    const cookieMenu = localStorage.getItem('cookieMenu');
    return cookieMenu || 'open';
  });

  const clickHandler = () => {
    setOpenOrClose('close');
    localStorage.setItem('cookieMenu', 'close');
  };
  return (
    <div className='relative'>
      {(openOrClose === 'open' || openOrClose === null) && (
        <div className='fixed w-full bottom-0 text-white bg-black sm:bg-dark_opacity z-10 p-6 sm:px-[40px] lg:px-[80px] flex flex-col sm:flex-row gap-[33px] items-center justify-center'>
          <p className='font-roboto'>Ta strona korzysta z Cookie tylko i wyłącznie w celach technicznych. Nie przechowujemy żadnych danych, nie śledzimy ruchu na stronie.</p>
          <RiCloseLine color="#fff" size={40} onClick={clickHandler} className='cursor-pointer'/>
        </div>
      )}
      
      <ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer fixed hidden lg:block z-100 lg:bottom-[40px] lg:right-[68px] translate-x-[50%] ">
                <div className='mt-[48px] sm:mt-[96px]lg:mt-[192px] diamond'>
                   <span className="arrow_up"></span>
                </div>
      </ScrollLink>
      <div className='gradient__bg'>
        <Navbar />
        <Header />
        <News/>
        <AboutUs/>
      </div>
      <OldProjects/> 
      <Footer/>
      
    </div>
  )
}

export default Home
