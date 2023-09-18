import React from 'react'
// TO REDESIGN PLACEHOLDER SECTION
interface CardProps {
  img: string
  name: string
  text: string
}

const Card: React.FC<CardProps> = ({ img, name, text }) => {
  return (
    <div className='text-white pb-[33px] px-[24px] sm:px-[58px] lg:px-[86px]'>
      <div className='flex items-center gap-[16px] mb-[16px]'>
        <img src={img} alt="avatar" className='w-[50px] h-[50px] rounded-full ' />
        <h4 className='text-dark_red'>{name}</h4>

      </div>

      <p className=''>{text}</p>
    </div>
  )
}

const AboutUs = () => {
  return (
    <div className='lg:h-[100vh] bg-almost_black px-6 sm:p-[40px] lg:p-[80px] lg:pl-[0] pt-[80px] lg:pt-0'>
      <div className='flex flex-col lg:flex-row  lg:relative'>
        <img src="../../assets/grafiki/173.png" alt="" className='lg:w-[500px] lg:h-[500px] lg:absolute lg:right-[50px] lg:bottom-1/2 lg:translate-y-1/2 '/>

        <div className='gradient__about  mt-[48px] p-6 sm:p-[58px] lg:p-[86px] text-white mb-[48px] lg:w-4/5 lg:h-[600px]'>
          <h3 className='font-barlow_condensed text-[24px] uppercase font-black leading-[32px]'>Zarząd</h3>
          <p className='font-roboto text-[16px] leading-[26px] lg:w-[700px] lg:mt-[24px] '>
          Najwyżej w hierarchii administracji serwera jest Zarząd, który składa się z trzech osób. Każdy z zarządców posiada wieloletnie doświadczenie w prowadzeniu serwerów:
          Discord,
          SCP Secret Labolatory,
          Minecraft,
          Unturned.
          Głównymi celami zarządców jest utrzymanie serwerów pod względem technicznym jak i finansowym, zbudowanie zgranej społeczności, nadzór nad administracją.</p>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row lg:justify-center'>
        {
          [{img: '../../assets/avatar/budlo.png', name: 'Budło', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, blanditiis.'},
          {img: '../../assets/avatar/mute.jpg', name: 'Mute', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, blanditiis.'},
          {img: '../../assets/avatar/NyMek.png', name: 'NyMek', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, blanditiis.'}].map((e, index) => (
            <Card img={e.img} name={e.name} text={e.text} key={index}/>
          ))
        }
      </div>
    </div>
  )
}

export default AboutUs
