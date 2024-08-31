

const UserSLSummaryChart = ({userSlOverview}:any) => {
  return (
    <div className="text-white font-roboto font-bold  flex flex-col w-full  gap-[33px]">
      <div className="sm:bg-dark_opacity grid md:grid-cols-3 md:grid-rows-1 sm:grid-cols-2 sm:grid-rows-2 gap-[33px] sm:gap-0">
        <div className=" h-[330px] bg-dark_opacity sm:bg-transparent grid grid-cols-1 grid-rows-2">
          <div className="flex flex-col justify-center items-center border-b-[1px] border-white_opacity">
            <p className="text-[48px]">{!userSlOverview.kdRatio ? userSlOverview.kills : userSlOverview.kdRatio}</p>
            <p className="text-[24px]">K/D</p>
          </div>
          <div className="grid grid-cols-3 grid-rows-2">
            <div className="flex flex-col justify-center items-center border-r-[1px] border-b-[1px] border-white_opacity">
              <p className="text-[18px] xs:text-[20px]">{userSlOverview.kills}</p>
              <p className="text-[11px] xs:text-[14px]">KILLS</p>
            </div>
            <div className="flex flex-col justify-center items-center border-b-[1px] border-white_opacity">
              <p className="text-[18px] xs:text-[20px]">{userSlOverview.deaths}</p>
              <p className="text-[11px] xs:text-[14px]">DEATHS</p>
            </div>
            <div className="flex flex-col justify-center items-center border-l-[1px] border-b-[1px] border-white_opacity">
              <p className="text-[18px] xs:text-[20px]">{userSlOverview.enteredPocket}</p>
              <p className="text-[11px] xs:text-[14px]">ENTERED POCKET</p>
            </div>
            <div className="flex flex-col justify-center items-center border-r-[1px] border-white_opacity">
              <p className="text-[18px] xs:text-[20px]">{(userSlOverview.kills/(userSlOverview.onlineTime/60)).toFixed(2)}</p>
              <p className="text-[11px] xs:text-[14px]">KPM</p>
            </div>
            <div className="flex flex-col justify-center items-center ">
              <p className="text-[18px] xs:text-[20px]">{(userSlOverview.deaths/(userSlOverview.onlineTime/60)).toFixed(2)}</p>
              <p className="text-[11px] xs:text-[14px]">DPM</p>
            </div>
            <div className="flex flex-col justify-center items-center border-l-[1px] border-white_opacity">
              <p className="text-[18px] xs:text-[20px]">{userSlOverview.enteredPocket != 0 ? ((userSlOverview.escapedPocket/userSlOverview.enteredPocket) * 100).toFixed(2) + '%' : 0 }</p>
              <p className="text-[11px] xs:text-[14px]">ESCAPED POCKET</p>
            </div>
          </div>
        </div>
        <div className="sm:row-span-2 h-[230px] ss:h-[300px] sm:h-[660px] md:h-[330px] relative bg-dark_opacity sm:bg-transparent">
          <img src="../../assets/class/ClassD.svg" alt="" className="absolute bottom-0 right-1/2 translate-x-1/2 h-[210px] ss:h-[280px] sm:h-[420px]  md:h-[340px] " />
        </div>
        <div className=" h-[330px] grid grid-cols-1 grid-rows-2 bg-dark_opacity sm:bg-transparent">
          <div className="flex flex-col justify-center items-center border-b-[1px] border-white_opacity">
            <p className="text-[48px]">{(userSlOverview.onlineTime/60).toFixed(2)}</p>
            <p className="text-[24px]">TIME (MIN)</p>
          </div>
          <div className="grid grid-cols-3 grid-rows-2 text-center">
            <div className="flex flex-col justify-center items-center border-r-[1px] border-b-[1px] border-white_opacity">
              <p className="text-[18px] xs:text-[20px]">{userSlOverview.headshots}</p>
              <p className="text-[11px] xs:text-[14px]">HEADSHOTS</p>
            </div>
            <div className="flex flex-col justify-center items-center border-b-[1px] border-white_opacity">
              <p className="text-[18px] xs:text-[20px]">{userSlOverview.firedShots}</p>
              <p className="text-[11px] xs:text-[14px]">FIRED SHOTS</p>
            </div>
            <div className="flex flex-col justify-center items-center border-l-[1px] border-b-[1px] border-white_opacity">
              <p className="text-[18px] xs:text-[20px]">{userSlOverview.accurateShots}</p>
              <p className="text-[11px] xs:text-[14px]">ACCURATE SHOTS</p>
            </div>
            <div className="flex flex-col justify-center items-center border-r-[1px] border-white_opacity">
              <p className="text-[18px] xs:text-[20px]">{userSlOverview.headshotPercentage}</p>
              <p className="text-[11px] xs:text-[14px]">HEADSHOT PERCENTAGE</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-[18px] xs:text-[20px]">{(userSlOverview.firedShots/(userSlOverview.onlineTime/60)).toFixed(2)}</p>
              <p className="text-[11px] xs:text-[14px]">FSPM</p>
            </div>
            <div className="flex flex-col justify-center items-center border-l-[1px] border-white_opacity">
              <p className="text-[18px] xs:text-[20px]">{userSlOverview.accuracy}</p>
              <p className="text-[11px] xs:text-[14px]">ACCURACY</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-dark_opacity grid md:grid-cols-3 md:grid-rows-1 sm:grid-cols-2 sm:grid-rows-2">
        <div className="h-[330px] border_gold"> LEVEL NA SLU WORK IN PROGRESS</div>
        <div className="h-[330px] border_gold">Szybkie podsumowanie Klass</div>
        <div className="h-[330px] border_gold">TYTUŁY NA SLU WORK IN PROGRESS</div>
      </div> For future development*/}

    </div>
  )
}

export default UserSLSummaryChart
