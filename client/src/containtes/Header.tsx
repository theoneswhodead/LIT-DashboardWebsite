import { NavLink } from "react-router-dom"
const Header = () => {
  return (
    <div className='flex flex-col sm:flex-row p-6 sm:p-[40px] lg:px-[80px] mt-[24px]'>
    <div className='sm:flex sm:flex-col justify-center sm:flex-1 lg:mr-[5rem]'>
        <h1 className='font-barlow_condensed text-white font-black text-[35px] leading-[40px] sm:text-[48px] sm:leading-[48px] lg:text-[72px] lg:leading-[72px] mb-[32px] '>Lux In <span className='text-dark_red'>Tenebris</span> czeka na ciebie, Dołącz już <span className='text-dark_red'>Teraz!</span></h1>
        <p className='font-roboto text-white text-[16px] leading-[26px] my-[24px] mb-[48px]'>Witaj na Lux In Tenebris - innowacyjnym serwerze SCP: Secret Laboratory! Nasz serwer oferuje nowe autorskie pluginy, profile graczy, dashboard i wiele innych atrakcji, zapewniając wyjątkowe doświadczenia w świecie SCP. Dołącz i odkryj tajemnice nowego serwera razem z nami!</p>
        <div className='flex justify-center sm:justify-end sm:mr-[24px]'>
            <NavLink to="/signup" className='border hover:border-dark_red px-[48px] py-4 reflect text-center'>
                <div className="text-white inline-block">Dołącz do <span className='text-dark_red font-bold '>Nas!</span></div>
             </NavLink>
        </div>    
    </div>
    <div className='sm:flex-1 sm:flex justify-end mt-[120px] ss:mt-[120px] ss:m-auto sm:mt-0 reflect '>
        <img src="../../assets/world_map500.png" alt="World Map" />
    </div>

</div>
  )
}

export default Header
