const News = () => {
  return (

    <section id="news" className="gradient__news flex flex-col h-full lg:h-[100vh] pt-[120px] pb-[120px] relative">

      <div className="pb-[49px] px-6 sm:px-[40px] lg:px-[80px]">
            <h1 className="text-white text-[40px] leading-[40px] font-black mb-[24px] sm:text-[48px] sm:leading-[48px] lg:text-[72px] lg:leading-[72px] font-barlow_condensed">Odkryj Nowości na Lunaris i <span className='text-dark_red'>Tenebris</span> </h1>
            <p className="text-white text-[16px] leading-[26px] font-roboto">Nowatorskie podejście do rozgrywki w SCP: Secret Laboratory na Lunaris i Tenebris jest naszą główną inicjatywą. Włożyliśmy ogromny wysiłek, aby wprowadzić systemy MMO, takie jak Codzienne Questy, Levelowanie oraz podział na frakcje, aby odświeżyć rozgrywkę. Warto zaznaczyć, że te zmiany nie ingerują w główny koncept rozgrywki. Wręcz przeciwnie, mają na celu jej urozmaicenie, podobnie jak to robiły pluginy na naszym poprzednim serwerze - GoldLegends.</p>
        </div>
  
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-1 px-6 sm:px-[40px] lg:pl-[80px] flex-col sm:grid gap-[33px] grid-cols-2 text-white font-roboto font-bold ">


            <div className="w-full  relative overflow-hidden hover:text-dark_red cursor-pointer">
              <img src="../../assets/grafiki/lab.png" alt="" className="zoom  "/>
              <p className="absolute bottom-[24px] right-1/2 translate-x-1/2 ">Elementy MMO</p>
            </div>

            <div className="w-full  relative overflow-hidden hover:text-dark_red cursor-pointer">
              <img src="../../assets/grafiki/dor.png" alt="" className="zoom  "/>
              <p className="absolute bottom-[24px] right-1/2 translate-x-1/2 ">Codziennie Questy</p>
            </div>

            <div className="w-full  relative overflow-hidden hover:text-dark_red cursor-pointer">
              <img src="../../assets/grafiki/mirr.png" alt="" className="zoom  "/>
              <p className="absolute bottom-[24px] right-1/2 translate-x-1/2 ">Frakcje</p>
            </div>

            <div className="w-full  relative overflow-hidden hover:text-dark_red cursor-pointer">
              <img src="../../assets/grafiki/arrest.png" alt="" className="zoom   "/>
              <p className="absolute bottom-[24px] right-1/2 translate-x-1/2 ">Śledź swoje postępy</p>
            </div>
            
          </div>

        <div className=" flex-1 mt-[48px] lg:mt-0 sm:mx-[40px] lg:px-[0] lg:pr-[80px] ">
          <video autoPlay loop muted className="h-full w-full">
          <source src="../../assets/bgvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
            
        </video>
        </div>

      </div>
        

    </section>
  )
}

export default News
