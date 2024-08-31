import { useState } from "react"
import { RiCloseLine } from 'react-icons/ri';


const texts = {
  "1": {
      "title": "Nowe Pluginy",
      "text": "Chcąc wzbogacić i urozmaicić rozgrywkę na serwerze, wprowadziliśmy nowe pluginy: SCP Swap i wiele wiecej.",
      "img": [
        '../../Public/grafiki/coin.png',
        '../../Public/grafiki/2.png',
        '../../Public/grafiki/3.png'

      ]
    },
    "2": {
      "title": "Comming Soon",
      "text": "Comming Soon",
      "img": [
        '../../Public/grafiki/4.png',
        '../../Public/grafiki/5.png',
        '../../Public/grafiki/6.png'

      ]
    },
    "3": {
      "title": "Comming Soon",
      "text": "Comming Soon",
      "img": [
        '../../Public/grafiki/1.png',
        '../../Public/grafiki/2.png',
        '../../Public/grafiki/3.png'

      ]
    },
    "4": {
      "title": "Śledź swoje postępy",
      "text": "Monitoruj swój rozwój zarówno na serwerze , jak i na Discordzie. Aby śledzić swoje osiągnięcia i statystyki, musisz zarejestrować konto na naszej stronie.",
      "img": [
        '../../Public/grafiki/4.png',
        '../../Public/grafiki/5.png',
        '../../Public/grafiki/6.png'

      ]
    }
    
  
}

const ModalInfo = ({ setIsModalOpen, title, text, img }: any) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(img[0]);

  const handleImageClick = (imgSrc: string) => {
    setBackgroundImage(imgSrc);
  };

  return (
    <div className={`right-0 left-0 top-0 bottom-0 absolute z-[100] border_gold bg-slate-700 backdrop-blur-[70px] p-6   bg-cover bg-center flex flex-col items-center lg:items-start justify-center `}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute right-6 top-6 cursor-pointer">
        <RiCloseLine color="#fff" size={50} onClick={() => setIsModalOpen(false)} />
      </div>
      <h2 className="gradient__text text-[28px] leading-[32px] font-black sm:text-[32px] sm:leading-[48px] lg:text-[40px] text-center lg:text-left mb-[24px]">{title}</h2>
      <p className="text-white text-center lg:text-left leading-[25px] lg:leading-[26px] mb-[24px]">{text}</p>

      <div className="flex flex-col sm:flex-row gap-[33px] mt-[33px] ">
        {img.map((imgSrc: string, index: number) => (
          <img
            key={index}
            src={imgSrc}
            alt={`Image ${index + 1}`}
            className="w-[150px] xs:w-[220px] sm:w-[200px] md:w-[305px] lg:w-[150px] object-cover cursor-pointer border_gold"
            onClick={() => handleImageClick(imgSrc)}
          />
        ))}
      </div>
    </div>
  );
};

const News = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [info, setInfo] = useState<{ title: string; text: string; img: any } | null>(null);

  return (

    <section id="news" className=" flex flex-col h-full  pt-[120px] pb-[120px]">

      <div className="pb-[49px] px-6 sm:px-[40px] lg:px-[80px]">
            <h1 className="text-white text-[40px] leading-[40px] font-black mb-[48px] sm:text-[48px] sm:leading-[48px] lg:text-[72px] lg:leading-[72px] font-barlow_condensed news_bar text-center lg:text-left">Odkryj Nowości na <span className='gradient__text'>GoldenLeague</span> </h1>
            <p className="text-white text-[16px] leading-[26px] font-roboto text-center lg:text-left">Odkryj nowości na GoldenLeague je już dziś!</p>
        </div>

      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-1 mx-6 sm:mx-[40px] lg:ml-[80px] flex-col sm:grid gap-[33px] grid-cols-2 text-white font-roboto font-bold relative">

        {
          isModalOpen && <ModalInfo setIsModalOpen={setIsModalOpen} title={info?.title} text={info?.text} img={info?.img} />

        }

            <div className="w-full  relative overflow-hidden  cursor-pointer border_gold"
              onClick={() => {setIsModalOpen(true); setInfo(texts["1"])} }
            >
              <img src="../../Public/grafiki/lab.png" alt="" className="zoom"/>
              <p className="absolute bottom-[24px] right-1/2 translate-x-1/2 pointer-events-none ">{texts["1"].title}</p>
            </div>

            <div className="w-full  relative overflow-hidden  cursor-pointer border_gold "
            onClick={() => {setIsModalOpen(true); setInfo(texts["2"])} }>
              <img src="../../Public/grafiki/dor.png" alt="" className="zoom "/>
              <p className="absolute bottom-[24px] right-1/2 translate-x-1/2 pointer-events-none">{texts["2"].title}</p>
            </div>

            <div className="w-full  relative overflow-hidden  cursor-pointer border_gold"
            onClick={() => {setIsModalOpen(true); setInfo(texts["3"])} }>
              <img src="../../Public/grafiki/mirr.png" alt="" className="zoom"/>
              <p className="absolute bottom-[24px] right-1/2 translate-x-1/2 pointer-events-none ">{texts["3"].title}</p>
            </div>

            <div className="w-full  relative overflow-hidden  cursor-pointer border_gold"
            onClick={() => {setIsModalOpen(true); setInfo(texts["4"])} }>
              <img src="../../Public/grafiki/arrest.png" alt="" className="zoom"/>
              <p className="absolute bottom-[24px] right-1/2 translate-x-1/2 pointer-events-none">{texts["4"].title}</p>
            </div>
            
          </div>

        <div className=" flex-1 mt-[48px] lg:mt-0 sm:mx-[40px] lg:px-[0] lg:pr-[80px] pb-6">
          <video autoPlay loop muted className="h-full w-full ">
            <source src="../../Public/bgvideo.mp4" type="video/mp4" />
              Twoja przeglądarka nie wspiera Video
            
          </video>
        </div>

      </div>
  
        
    </section>
  )
}

export default News
