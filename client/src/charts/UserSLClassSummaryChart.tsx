

const UserSLClassSummaryChart = ({userSlClassOverview, img, classNumber}:any) => {
    return (
      <div className="text-white font-roboto font-bold  flex flex-col w-full  gap-[33px]">
        <div className="sm:bg-dark_opacity grid md:grid-cols-3 md:grid-rows-1 sm:grid-cols-2 sm:grid-rows-2 gap-[33px] sm:gap-0">
          <div className=" h-[330px] bg-dark_opacity sm:bg-transparent grid grid-cols-1 grid-rows-2">
            <div className="flex flex-col justify-center items-center border-b-[1px] border-white_opacity">
              <p className="text-[48px]">{!userSlClassOverview[classNumber].roleStats.kdRatio ? userSlClassOverview[classNumber].roleStats.kills : userSlClassOverview[classNumber].roleStats.kdRatio}</p>
              <p className="text-[24px]">K/D</p>
            </div>
            <div className="grid grid-cols-3 grid-rows-2">
              <div className="flex flex-col justify-center items-center border-r-[1px] border-b-[1px] border-white_opacity">
                <p className="text-[18px] xs:text-[20px]">{userSlClassOverview[classNumber].roleStats.kills}</p>
                <p className="text-[11px] xs:text-[14px]">KILLS</p>
              </div>
              <div className="flex flex-col justify-center items-center border-b-[1px] border-white_opacity">
                <p className="text-[18px] xs:text-[20px]">{userSlClassOverview[classNumber].roleStats.deaths}</p>
                <p className="text-[11px] xs:text-[14px]">DEATHS</p>
              </div>
              <div className="flex flex-col justify-center items-center border-l-[1px] border-b-[1px] border-white_opacity">
                <p className="text-[18px] xs:text-[20px]">{userSlClassOverview[classNumber].roleStats.timesJumped }</p>
                <p className="text-[11px] xs:text-[14px]">JUMPS</p>
              </div>
              <div className="flex flex-col justify-center items-center border-r-[1px] border-white_opacity">
                <p className="text-[18px] xs:text-[20px]">{(userSlClassOverview[classNumber].roleStats.kills/(userSlClassOverview[classNumber].roleStats.timePlayed/60)).toFixed(2)}</p>
                <p className="text-[11px] xs:text-[14px]">KPM</p>
              </div>
              <div className="flex flex-col justify-center items-center ">
                <p className="text-[18px] xs:text-[20px]">{(userSlClassOverview[classNumber].roleStats.deaths/(userSlClassOverview[classNumber].roleStats.timePlayed/60)).toFixed(2)}</p>
                <p className="text-[11px] xs:text-[14px]">DPM</p>
              </div>
              <div className="flex flex-col justify-center items-center border-l-[1px] border-white_opacity">
                <p className="text-[18px] xs:text-[20px]">{(userSlClassOverview[classNumber].roleStats.timesJumped/(userSlClassOverview[classNumber].roleStats.timePlayed/60)).toFixed(2)}</p>
                <p className="text-[11px] xs:text-[14px]">JPM</p>
              </div>
            </div>
          </div>
          <div className="sm:row-span-2 h-[230px] ss:h-[300px] sm:h-[660px] md:h-[330px] relative bg-dark_opacity sm:bg-transparent">
            <img src={img} alt={userSlClassOverview[classNumber].roleStats.roleId} className="absolute bottom-0 right-1/2 translate-x-1/2 h-[210px] ss:h-[280px] sm:h-[420px]  md:h-[340px] " />
            
          </div>
          <div className=" h-[330px] grid grid-cols-1 grid-rows-2 bg-dark_opacity sm:bg-transparent">
            <div className="flex flex-col justify-center items-center border-b-[1px] border-white_opacity">
              <p className="text-[48px]">{(userSlClassOverview[classNumber].roleStats.timePlayed/60).toFixed(2)}</p>
              <p className="text-[24px]">TIME (MIN)</p>
            </div>
            <div className="grid grid-cols-3 grid-rows-2 text-center">
              <div className="flex flex-col justify-center items-center border-r-[1px] border-b-[1px] border-white_opacity">
                <p className="text-[18px] xs:text-[20px]">{userSlClassOverview[classNumber].roleStats.headshots}</p>
                <p className="text-[11px] xs:text-[14px]">HEADSHOTS</p>
              </div>
              <div className="flex flex-col justify-center items-center border-b-[1px] border-white_opacity">
                <p className="text-[18px] xs:text-[20px]">{userSlClassOverview[classNumber].roleStats.firedShots}</p>
                <p className="text-[11px] xs:text-[14px]">FIRED SHOTS</p>
              </div>
              <div className="flex flex-col justify-center items-center border-l-[1px] border-b-[1px] border-white_opacity">
                <p className="text-[18px] xs:text-[20px]">{userSlClassOverview[classNumber].roleStats.accurateShots}</p>
                <p className="text-[11px] xs:text-[14px]">ACCURATE SHOTS</p>
              </div>
              <div className="flex flex-col justify-center items-center border-r-[1px] border-white_opacity">
                <p className="text-[18px] xs:text-[20px]">{userSlClassOverview[classNumber].roleStats.headshotPercentage}</p>
                <p className="text-[11px] xs:text-[14px]">HEADSHOT PERCENTAGE</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-[18px] xs:text-[20px]">{(userSlClassOverview[classNumber].roleStats.firedShots/(userSlClassOverview[classNumber].roleStats.timePlayed/60)).toFixed(2)}</p>
                <p className="text-[11px] xs:text-[14px]">FSPM</p>
              </div>
              <div className="flex flex-col justify-center items-center border-l-[1px] border-white_opacity">
                <p className="text-[18px] xs:text-[20px]">{userSlClassOverview[classNumber].roleStats.accuracy}</p>
                <p className="text-[11px] xs:text-[14px]">ACCURACY</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default UserSLClassSummaryChart
  