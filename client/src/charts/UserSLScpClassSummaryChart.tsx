import { useState, useEffect } from "react"


const UserSLScpClassSummaryChart = ({userSlScpClassOverview, img, classNumber}:any) => {
const [abbility, setAbbility] = useState('')
const [value, setValue] = useState(0)
const [is079, setIs079] = useState(false)

useEffect(() => {
  switch (userSlScpClassOverview[classNumber].roleStats.roleId) {
    case 'Scp173':
      setAbbility('PLACED SUBSTANCE');
      setValue(userSlScpClassOverview[classNumber].roleStats.placedTantrums);
      break;
    case 'Scp106':
      setAbbility('COUGHT IN POCKET');
      setValue(userSlScpClassOverview[classNumber].roleStats.caughtInPocket);
      break;
    case 'Scp096':
      setAbbility('TIMES RAGED');
      setValue(userSlScpClassOverview[classNumber].roleStats.timesRaged);
      break;
    case 'Scp049':
      setAbbility('TIMES RESURRECTION');
      setValue(userSlScpClassOverview[classNumber].roleStats.timesRecalled);
      break;
    case 'Scp0492':
      setAbbility('CONSUMED CORPSES');
      setValue(userSlScpClassOverview[classNumber].roleStats.consumedCorpses);
      break;
    case 'Scp3114':
      setAbbility('TIMES DISGUISED');
      setValue(userSlScpClassOverview[classNumber].roleStats.timesDisguised);
      break;
    case 'Scp079':
      setIs079(true);
      break;
    case 'Scp939':
      setAbbility('SAVED VOICES');
      setValue(userSlScpClassOverview[classNumber].roleStats.savedVoices);
      break;
    default:
      break;
  }
}, [userSlScpClassOverview, classNumber]);

    return (
      <div className="text-white font-roboto font-bold  flex flex-col w-full  gap-[33px]">
        <div className="sm:bg-dark_opacity grid md:grid-cols-3 md:grid-rows-1 sm:grid-cols-2 sm:grid-rows-2 gap-[33px] sm:gap-0">
          <div className=" h-[330px] bg-dark_opacity sm:bg-transparent grid grid-cols-1 grid-rows-2">
            <div className="flex flex-col justify-center items-center border-b-[1px] border-white_opacity">
              <p className="text-[48px]">{!userSlScpClassOverview[classNumber].roleStats.kdRatio ? userSlScpClassOverview[classNumber].roleStats.kills : userSlScpClassOverview[classNumber].roleStats.kdRatio }</p>
              <p className="text-[24px]">K/D</p>
            </div>
            <div className="grid grid-cols-3 grid-rows-2">
              <div className="flex flex-col justify-center items-center border-r-[1px] border-b-[1px] border-white_opacity">
                <p className="text-[18px] xs:text-[20px]">{userSlScpClassOverview[classNumber].roleStats.kills}</p>
                <p className="text-[11px] xs:text-[14px]">KILLS</p>
              </div>
              <div className="flex flex-col justify-center items-center border-b-[1px] border-white_opacity">
                <p className="text-[18px] xs:text-[20px]">{userSlScpClassOverview[classNumber].roleStats.deaths}</p>
                <p className="text-[11px] xs:text-[14px]">DEATHS</p>
              </div>
              <div className="flex flex-col justify-center items-center border-l-[1px] border-b-[1px] border-white_opacity">
                <p className="text-[18px] xs:text-[20px]">{userSlScpClassOverview[classNumber].roleStats.timesJumped }</p>
                <p className="text-[11px] xs:text-[14px]">JUMPS</p>
              </div>
              <div className="flex flex-col justify-center items-center border-r-[1px] border-white_opacity">
                <p className="text-[18px] xs:text-[20px]">{(userSlScpClassOverview[classNumber].roleStats.kills/(userSlScpClassOverview[classNumber].roleStats.timePlayed/60)).toFixed(2)}</p>
                <p className="text-[11px] xs:text-[14px]">KPM</p>
              </div>
              <div className="flex flex-col justify-center items-center ">
                <p className="text-[18px] xs:text-[20px]">{(userSlScpClassOverview[classNumber].roleStats.deaths/(userSlScpClassOverview[classNumber].roleStats.timePlayed/60)).toFixed(2)}</p>
                <p className="text-[11px] xs:text-[14px]">DPM</p>
              </div>
              <div className="flex flex-col justify-center items-center border-l-[1px] border-white_opacity">
                <p className="text-[18px] xs:text-[20px]">{(userSlScpClassOverview[classNumber].roleStats.timesJumped/(userSlScpClassOverview[classNumber].roleStats.timePlayed/60)).toFixed(2)}</p>
                <p className="text-[11px] xs:text-[14px]">JPM</p>
              </div>
            </div>
          </div>
          <div className="sm:row-span-2 h-[230px] ss:h-[300px] sm:h-[660px] md:h-[330px] relative bg-dark_opacity sm:bg-transparent">
            <img src={img} alt={userSlScpClassOverview[classNumber].roleStats.roleId} className="absolute bottom-0 right-1/2 translate-x-1/2 h-[210px] ss:h-[280px] sm:h-[420px]  md:h-[340px] " />
          </div>
          <div className=" h-[330px] grid grid-cols-1 grid-rows-2 bg-dark_opacity sm:bg-transparent">
            <div className="flex flex-col justify-center items-center border-b-[1px]  border-white_opacity">
              <p className="text-[48px]">{(userSlScpClassOverview[classNumber].roleStats.timePlayed/60).toFixed(2)}</p>
              <p className="text-[24px]">TIME (MIN)</p>
            </div>
            
            {
              is079 ?
              (
                <div className="grid grid-cols-3 grid-rows-2 text-center">
                <div className="flex flex-col justify-center items-center border-b-[1px] border-r-[1px] border-white_opacity">
                    <p className="text-[18px] xs:text-[20px]">{userSlScpClassOverview[classNumber].roleStats.totalGainedExperience}</p>
                    <p className="text-[11px] xs:text-[14px]">GAINED EXPERIENCE</p>
                  </div>
                  <div className="flex flex-col justify-center border-b-[1px] border-white_opacity items-center ">
                    <p className="text-[18px] xs:text-[20px]">{userSlScpClassOverview[classNumber].roleStats.teslaInteractions}</p>
                    <p className="text-[11px] xs:text-[14px]">TESLA INTERACTIONS</p>
                  </div>
                  <div className="flex flex-col justify-center items-center border-b-[1px] border-l-[1px] border-white_opacity">
                    <p className="text-[18px] xs:text-[20px]">{userSlScpClassOverview[classNumber].roleStats.roomBlackouts}</p>
                    <p className="text-[11px] xs:text-[14px]">BLACKOUTS</p>
                  </div>
    
                </div>
              ) :
              (
                <div className="grid grid-cols-1 grid-rows-1 text-center">
                   <div className="flex flex-col justify-center items-center border-white_opacity">
                    <p className="text-[48px]">{value}</p>
                    <p className="text-[24px]">{abbility}</p>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
  
  export default UserSLScpClassSummaryChart
  