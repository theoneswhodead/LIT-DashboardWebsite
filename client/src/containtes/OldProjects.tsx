import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const OldProjects = () => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1060 },
      items: 3,
      slidesToSlide: 3 
    },
    tablet: {
      breakpoint: { max: 1060, min: 768 },
      items: 2,
      slidesToSlide: 2 
    },
    mobile: {
      breakpoint: { max: 580, min: 0 },
      items: 1,
      slidesToSlide: 1 
    }
  };


  return (
    <section id="history" className='gradient__bg'>


    <div className='p-6  lg:p-[80px] sm:p-[40px]'>
    <h2 className='font-barlow_condensed text-white font-black text-[28px] leading-[28px] sm:text-[32px] sm:leading-[48px] lg:text-[40px] lg:leading-[28px] pb-6 sm:pb-[40px] lg:pb-[80px]'>Historia serwera <span className="gradient__text font-bold">GoldenLeague</span></h2>
    <Carousel
        swipeable={false}
        draggable={true}
        responsive={responsive}
        ssr={false} 
        keyBoardControl={true}
        customTransition="all 1s"
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >

        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black sm:text-[32px] px-6'>22.06.2018</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Założenie Serwera</h3>
            <p className='px-6'>W tym dniu zaczęła się pewna legenda...</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black sm:text-[32px] px-6'>24.08.2018</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>I Ty możesz zostać moderatorem GoldenLeague!</h3>
            <p className='px-6'>Pierwsza rekrutacja na stanowiska Moderatorów, wyłonione wtedy osoby na zawsze zmieniły bieg historii serwera</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>07.10.2018</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Ogłoszenie Konstytucji GoldenLeague</h3>
            <p className='px-6'>Każdy dostał swoje prawa, jak i obowiązki</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>30.10.2018</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Sojusz z S</h3>
            <p className='px-6'>Nadszedł czas miecza i topora, w tym momęcie wojna była już kwestią godzin.</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>30.10.2018</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Bunt i odejście Administracji</h3>
            <p className='px-6'>Nastąpiła wojna domowa w administracji po zawarciu Sojuszu z s</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>07.11.2018</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Święta wojna z S</h3>
            <p className='px-6'>Niezadowolona społeczność GL wszczyna wojnę przeciwko Somsiadowni, trwa ofensywa na</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>12.11.2018</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Nowy start serwera, banicja osób z Somsiadowni</h3>
            <p className='px-6'>Zarząd powrócił na serwer, a w celu uspokojenia społeczności została przeprowadzona czystka.</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>1.12.2018</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Pierwsza edycja Jakiej To Melodii</h3>
            <p className='px-6'>Sapper przeprowadził jeden z najwiekszych eventów na Discordzie GL</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>26.01.2019</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Powstanie Serwera w Unturned</h3>
            <p className='px-6'>GoldenLeague poszerza swoje działania o serwer w Unturned</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>09.03.2019</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Pierwsza edycja serwera w Minecraft</h3>
            <p className='px-6'>Jak to czasem bywa, każdy chciał pograć w minecrafta i w tym pomogliśmy</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>21.01.2020</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Event Memiarz</h3>
            <p className='px-6'>Każdy mógł się wykasać swoimi memiarskimi zdolnościami</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>24.04.2020</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Nieoficjalny serwer Minecraft</h3>
            <p className='px-6'>Jedna z lepszych edycji serwerów Minecraft, stworzona przez honkadaloonga aka Janek</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>22.08.2020</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Zwiastun kanału Youtube</h3>
            <p className='px-6'>Pierwszy filmik na kanale GoldenLeague opisujący historię serwera</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>17.02.2021</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Druga Edycja servera w Unturned</h3>
            <p className='px-6'>Server w Unturned został ponownie otwarty na pewien okres czasu</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>26.02.2021</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Kolejna Edycja servera w Minecraft</h3>
            <p className='px-6'>Kolejna bardzo udana edycja serwera Minecraft, wyróżniała się dużą ilością graczy, rozbudowanym spawnem oraz klubem nocnym</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>01.05.2021</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Widmo kolejnej wojny załagodzone</h3>
            <p className='px-6'>Napięcia na linii GoldenLeague - Hipermonia, zostały załagodzone, zawarty został układ o przyjacielskich stosunkach</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>08.08.2021</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Kim jesteśmy? Dokąd zmierzamy?</h3>
            <p className='px-6'>Zebranie społeczności w celu przedyskutowania dalszego działania serwera</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>22.08.2021</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Jeszcze jedna edycja serwera w Minecraft</h3>
            <p className='px-6'>Całkiem udana edycja, z przepięknym spawnem w średniowiecznym stylu</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>04.02.2022</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Informacja o Zamknięciu Serwerów</h3>
            <p className='px-6'>Nic nie może trwać wiecznie... 07.02.2022 serwery GoldenLeague  po praktycznie 4 latach zostały zamknięte... jak się wtedy wydawało na zawsze, a serwer discordowy przeszedł w stan stagnacji</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>22.06.2022</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Coś się kończy coś się zaczyna</h3>
            <p className='px-6'>Dokładnie po 4 latach działalności, serwer GoldenLeaguez ostał oficjalnie zamknięty</p>
        </div>
        <div className='cursor-pointer text-white select-none'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black px-6'>03.11.2023</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px] px-6'>Powró<textarea name="" id="" rows="10"></textarea></h3>
            <p className='px-6'>Po prawie dwu letniej przerwie GoldenLeague powrócił, a czy czeka go świetlana przyszłość, tego przekonamy się wkrótce</p>
        </div>
          
      </Carousel>
    </div>
      

      {/* <Carousel
        swipeable={false}
        draggable={true}
        responsive={responsive}
        ssr={false} 
        infinite={true}
        keyBoardControl={true}
        customTransition="all 1s"
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        <div className='cursor-pointer h-[300px] '>
          <img src="../../assets/history/20180816203808_1.jpg" alt="" className='cursor-pointer  pointer-events-none'/>
        </div>
        <div className='cursor-pointer h-[300px] '>
          <img src="../../assets/history/2qgapx.jpg" alt="" className='cursor-pointer  pointer-events-none'/>
        </div>
        <div className='cursor-pointer h-[300px] '>
          <img src="../../assets/history/3ms7sp.jpg" alt="" className='cursor-pointer  pointer-events-none'/>
        </div>
        <div className='cursor-pointer h-[300px] '>
          <img src="../../assets/history/a.png" alt="" className='cursor-pointer  pointer-events-none'/>
        </div>
        <div className='cursor-pointer h-[300px] '>
          <img src="../../assets/history/aa.png" alt="" className='cursor-pointer  pointer-events-none'/>
        </div>
        <div className='cursor-pointer h-[300px] '>
          <img src="../../assets/history/assadsad.png" alt="" className='cursor-pointer  pointer-events-none'/>
        </div>
        <div className='cursor-pointer h-[300px] '>
          <img src="../../assets/history/b.png" alt="" className='cursor-pointer  pointer-events-none'/>
        </div>
        <div className='cursor-pointer h-[300px] '>
          <img src="../../assets/history/BeASDz tytułu.png" alt="" className='cursor-pointer  pointer-events-none'/>
        </div>
        <div className='cursor-pointer h-[300px] '>
          <img src="../../assets/history/Bez tytuasdasdsadłu — kopia.png" alt="" className='cursor-pointer  pointer-events-none'/>
        </div>
        <div className='cursor-pointer h-[300px] '>
          <img src="../../assets/history/Bez tytułu.png" alt="" className='cursor-pointer  pointer-events-none'/>
        </div>
        <div className='cursor-pointer h-[300px] '>
          <img src="../../assets/history/bruh_3_edit.png" alt="" className='cursor-pointer  pointer-events-none'/>
        </div>

      </Carousel> */}
    </section>
  )
}

export default OldProjects
