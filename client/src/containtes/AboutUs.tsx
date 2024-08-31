import React from 'react'
interface CardProps {
  img: string
  name: string
  text: string
}

const menagement = [
  {img: '../../Public/user.png', name: 'Admin', text: 'Cześć, miło mi Cię poznać, odpowiadam za sekcję discord naszego serwera, mam nadzieję że fajnie spędzisz u Nas czas!'},
  {img: '../../Public/user.png', name: 'Admin', text: 'Od najmłodszych lat interesowało mnie prowadzenie serwerów gier. Wydaje mi się, że właśnie ta pasja skłoniła mnie by założyć GoldenLeague.'},
  {img: '../../Public/user.png', name: 'Admin', text: 'Od zawsze lubiłem gry, tutaj poszerzam swoją pasję do nich'}
]

const Card: React.FC<CardProps> = ({ img, name, text }) => {
  return (
    <div className='text-white pb-[33px] flex flex-col flex-1 px-[24px] sm:px-[58px] lg:px-[86px] menagement_bar'>
      <div className='flex items-center gap-[16px] mb-[16px]'>
        <img src={img} alt={name} className='w-[50px] h-[50px] rounded-full ' />
        <h4 className='text-white  font-roboto text-[24px] font-bold ' >{name}</h4>
      </div>
      <p className='font-roboto'>{text}</p>
    </div>
  )
}

const AboutUs = () => {
  return (
    <section id="about" className=' px-6 sm:p-[40px] lg:p-[80px] lg:pl-[0] pt-[80px] lg:pt-0'>
      <div className='flex flex-col md:flex-row  md:relative'>

        <img src="../../Public/grafiki/igl.jpg" alt="" className=' object-cover md:w-[375px] md:h-[375px] lg:w-[500px] xl:w-[550px] xl:h-[550px] lg:h-[500px] md:absolute md:right-[50px] md:bottom-1/2 md:translate-y-[55%] '/>

        <div className='gradient__gold mt-[48px] p-6 sm:p-[58px] lg:p-[86px] text-black  md:w-4/5 md:h-[600px]'>
          <h2 className='font-barlow_condensed text-[40px] uppercase font-black leading-[40px] sm:text-[48px] sm:leading-[48px] lg:text-[72px] lg:leading-[72px] mb-[24px]'>GoldenLeague</h2>

          <p className='font-roboto text-[24px] leading-[32px] md:w-[500px] lg:w-[700px] xl:w-[1000px] pt-[24px] sp:mb-[40px] border-t-[1px]  border-opacity-25 border-black'>
          Jesteśmy jedną z najstarszych sieci serwerów w Polsce prowadzących swoje serwery. Nasze serwery, były dostępne już od 2018r. Nie skupiamy się wyłącznie na jednej grze, od czasu do czasu otwieramy serwery w różnch grach, takich jak Minecraft, Unturned, Battlefield czy G-mod. Ponadto, prowadzimy również serwer Discord, który jest centralnym punktem dla społeczności naszych graczy. Na tym serwerze organizujemy okazjonalne wydarzenia z różnymi nagrodami.</p>
        </div>
      </div>

      <h2 className='font-barlow_condensed text-white p-6 sm:px-[40px] lg:px-[80px] lg:mt-[80px] sm:my-[40px] font-black text-[28px] leading-[28px] sm:text-[32px] sm:leading-[48px] lg:text-[40px] lg:leading-[28px]'>Zarząd <span className="gradient__text">GoldenLeague</span></h2>
      <div className='flex flex-col sm:flex-row lg:justify-center lg:mt-[2menagement_barpx] lg:mb-[80px] sm:mb-[40px]'>
        
        {
          menagement.map((e, index) => (
            <Card img={e.img} name={e.name} text={e.text} key={index}/>
          ))
        }
      </div>
    </section>
  )
}

export default AboutUs
