import { useState } from "react"
import { RiCloseLine } from 'react-icons/ri';

const texts = {
  "1": {
      "title": "Elementy MMO",
      "text": "Chcąc wzbogacić rozgrywkę na serwerze, wprowadziliśmy innowacyjne elementy znane z gier MMO RPG. Gracze teraz mogą monitorować swoje postępy dzięki systemowi LVLowania. Dodatkowo, mają możliwość zdobywania specjalnych osiągnięć i rang, które mogą pochwalić się przed innymi graczami. Zdobywanie tych osiągnięć odblokowuje również unikalne rangi. Grając, zdobywasz walutę, którą możesz wykorzystać w specjalnych wydarzeniach na serwerze oraz do dostosowywania swojego ekwipunku. Codzienne questy pozwalają zdobywać poziomy i dodatkową walutę.",
      "img": [
        '../../assets/grafiki/1.png',
        '../../assets/grafiki/2.png',
        '../../assets/grafiki/3.png'

      ]
    },
    "2": {
      "title": "Codzienne Questy",
      "text": "Na naszym serwerze oferujemy Codzienne Misje, które pozwalają graczom zdobywać nagrody w postaci waluty i awansować na wyższy poziom doświadczenia. Każdego dnia otrzymujesz zestaw 5 zadań o zróżnicowanym stopniu trudności. Dodatkowo, wspierając nasz serwer, możesz zdobyć więcej punktów doświadczenia za konkretne misje i odblokować specjalne wyzwania. Dodatkowo, co tydzień organizujemy specjalne wydarzenie frakcyjne w sobotę o 18:00, gwarantujące uczestnikom określoną ilość punktów doświadczenia oraz waluty.",
      "img": [
        '../../assets/grafiki/4.png',
        '../../assets/grafiki/5.png',
        '../../assets/grafiki/6.png'

      ]
    },
    "3": {
      "title": "Frakcje",
      "text": "Frakcje - Wybierz swoją stronę, jasność, czy ciemność. Aby dokonać wyboru frakcji, musisz być zaprawiony w boju, czyli osiągnąć minimum piąty poziom. Po wybraniu swojej frakcji, otrzymasz specjalne korzyści w danym tygodniu, zależne od losowego wydarzenia, które ma miejsce w sobotę. Dodatkowe niespodzianki są już w przygotowaniu.",
      "img": [
        '../../assets/grafiki/1.png',
        '../../assets/grafiki/2.png',
        '../../assets/grafiki/4.png'

      ]
    },
    "4": {
      "title": "Śledź swoje postępy",
      "text": "Monitoruj swój rozwój zarówno na serwerze SCP, jak i na Discordzie. Aby śledzić swoje osiągnięcia i statystyki, musisz zarejestrować konto na naszej stronie. Dzięki temu narzędziu będziesz mógł śledzić swoją pozycję w rankingach, poziomu, ilości waluty, liczby wysłanych wiadomości i wiele innych aspektów związanych z twoim udziałem na serwerze. To doskonałe narzędzie do monitorowania swojego postępu i śledzenia swoich wyników.",
      "img": [
        '../../assets/grafiki/4.png',
        '../../assets/grafiki/5.png',
        '../../assets/grafiki/3.png'

      ]
    }
    
  
}

const ModalInfo = ({ setIsModalOpen, title, text, img }: any) => {

  //let img = '../../assets/grafiki/1.png'
  console.log(img[0])
  return (
    <div className="w-full h-[100vh] bg-red-600 absolute z-[100] bg-dark_opacity  backdrop-blur-[70px] p-6 sm:p-[40px] lg:p-[80px]">
    <div className="absolute right-6 top-6 cursor-pointer">
      <RiCloseLine color="#fff" size={50} onClick={()=> setIsModalOpen(false)}/>
    </div>
      <h2 className="text-white text-[28px] leading-[28px] font-black sm:text-[32px] sm:leading-[48px] lg:text-[40px] ">{title}</h2>
      <p className="text-white leading-[25px] lg:leading-[26px]">{text}</p>

      <div className="flex gap-[24px]">
        <div className={`bg-[url('${img[0]}')] w-[240px] h-[130px] bg-cover bg-center`}></div>
        <div className={`bg-[url('${img[1]}')] w-[240px] h-[130px] bg-cover bg-center`}></div>
        {/* <div className={`bg-[url('${img[2]}')] w-[240px] h-[130px] bg-cover bg-center`}></div> ZRÓB IMG MOŻE */}
      </div>
  </div>
  )
}

const News = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [info, setInfo] = useState<{ title: string; text: string; img: any } | null>(null);

  return (

    <section id="news" className="gradient__news flex flex-col h-full lg:h-[100vh] pt-[120px] pb-[120px] relative">

      <div className="pb-[49px] px-6 sm:px-[40px] lg:px-[80px]">
            <h1 className="text-white text-[40px] leading-[40px] font-black mb-[24px] sm:text-[48px] sm:leading-[48px] lg:text-[72px] lg:leading-[72px] font-barlow_condensed">Odkryj Nowości na Lunaris i <span className='text-dark_red'>Tenebris</span> </h1>
            <p className="text-white text-[16px] leading-[26px] font-roboto">Nowatorskie podejście do rozgrywki w SCP: Secret Laboratory na Lunaris i Tenebris jest naszą główną inicjatywą. Włożyliśmy ogromny wysiłek, aby wprowadzić systemy MMO, takie jak Codzienne Questy, Levelowanie oraz podział na frakcje, aby odświeżyć rozgrywkę. Warto zaznaczyć, że te zmiany nie ingerują w główny koncept rozgrywki. Wręcz przeciwnie, mają na celu jej urozmaicenie, podobnie jak to robiły pluginy na naszym poprzednim serwerze - GoldLegends.</p>
        </div>

        {
          isModalOpen && <ModalInfo setIsModalOpen={setIsModalOpen} title={info?.title} text={info?.text} img={info?.img} />

        }

        
  
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-1 px-6 sm:px-[40px] lg:pl-[80px] flex-col sm:grid gap-[33px] grid-cols-2 text-white font-roboto font-bold ">


            <div className="w-full  relative overflow-hidden hover:text-dark_red cursor-pointer"
              onClick={() => {setIsModalOpen(true); setInfo(texts["1"])} }
            >
              <img src="../../assets/grafiki/lab.png" alt="" className="zoom  "/>
              <p className="absolute bottom-[24px] right-1/2 translate-x-1/2 ">Elementy MMO</p>
            </div>

            <div className="w-full  relative overflow-hidden hover:text-dark_red cursor-pointer"
            onClick={() => {setIsModalOpen(true); setInfo(texts["2"])} }>
              <img src="../../assets/grafiki/dor.png" alt="" className="zoom  "/>
              <p className="absolute bottom-[24px] right-1/2 translate-x-1/2 ">Codziennie Questy</p>
            </div>

            <div className="w-full  relative overflow-hidden hover:text-dark_red cursor-pointer"
            onClick={() => {setIsModalOpen(true); setInfo(texts["3"])} }>
              <img src="../../assets/grafiki/mirr.png" alt="" className="zoom  "/>
              <p className="absolute bottom-[24px] right-1/2 translate-x-1/2 ">Frakcje</p>
            </div>

            <div className="w-full  relative overflow-hidden hover:text-dark_red cursor-pointer"
            onClick={() => {setIsModalOpen(true); setInfo(texts["4"])} }>
              <img src="../../assets/grafiki/arrest.png" alt="" className="zoom   "/>
              <p className="absolute bottom-[24px] right-1/2 translate-x-1/2 ">Śledź swoje postępy</p>
            </div>
            
          </div>

        <div className=" flex-1 mt-[48px] lg:mt-0 sm:mx-[40px] lg:px-[0] lg:pr-[80px] ">
          <video autoPlay loop muted className="h-full w-full">
            <source src="../../assets/bgvideo.mp4" type="video/mp4" />
              Twoja przeglądarka nie wspiera Video
          </video>
        </div>

      </div>
        

    </section>
  )
}

export default News
