import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import useWindowDimensions from "../hooks/useWindowDimensions";
import { MembersChart, MessagesChart, BasicServerInforChart } from "../charts";

interface UserData {
    _id: String,
    nickname: String,
    ip: String,
    xp: Number,
    gold: Number,
    ignoreDNT: Boolean,
    dntEnabled: Boolean,
    kills: Number,
    deaths: Number,
    firedShots: Number,
    accurateShots: Number,
    headshots: Number,
    enteredPocket: Number,
    escapedPocket: Number,
    timesJumped: Number,
    caughtInPocket: Number,
    onlineTime: Number,
    firstJoined: Date,
    lastSeen: Date,
    level: Number,
    kdRatio: Number,
    accuracy: String,
    headshotPercentage: String,
  }

const DashboardServerSlOverview = () => {
    const {user} = useAuthContext()
    const { height, width } = useWindowDimensions();
    const [serverSlOverview, setServerSlOverview] = useState<UserData>({ 
        _id: '',
        nickname: '',
        ip: '',
        xp: 0,
        gold: 0,
        ignoreDNT: false,
        dntEnabled: false,
        kills: 0,
        deaths: 0,
        firedShots: 0,
        accurateShots: 0,
        headshots: 0,
        enteredPocket: 0,
        escapedPocket: 0,
        timesJumped: 0,
        caughtInPocket: 0,
        onlineTime: 0,
        firstJoined: new Date(),
        lastSeen: new Date(),
        level: 0,
        kdRatio: 0,
        accuracy: '',
        headshotPercentage: '',
     });

        
        useEffect(()=> {
            const fetchServerOverview = async () => {
        
              const response = await axios.get('http://localhost:5000/dashboard/server-sl-overview', {
              withCredentials: true,
              headers: { 'Authorization': `Bearer ${user.token}` }
             })

              if (response.status === 200) {
                const jsonData = response.data[0]; // one servwr temp 
                setServerSlOverview(jsonData);
              }
            }
            if(user) {
              fetchServerOverview()
            }
         }, [])

  let chartHeight = 400;
  if(height > chartHeight){
    if(width < 420) {
      chartHeight = 250
    } 
  } 

  return (
    <div className='text-white flex flex-col mt-[187px] sm:pl-[275px] lg:pl-[315px] w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px]'>
  asdsadasd

        {/* <div >
          <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Podstawowe informacje</h2>
          <BasicServerInforChart serverOverview={serverOverview} chartHeight={width < 420 ? 300 : 400} chartWidth={width < 420 ? '250px' : width > 850 ?'780px': '400px'}/>
        </div>
       
        <div>
          <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Ilość osób na serwerze, które dołączyły oraz wyszły</h2>
          <MembersChart serverOverview={serverOverview} chartHeight={chartHeight} chartWidth={'100%'}/>
        </div>
      

      <div>
        <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Wiadomości na kanałach tekstowych dla serwera</h2>
        <MessagesChart serverOverview={serverOverview} chartHeight={chartHeight} chartWidth={'100%'}/>
      </div> */}

      

  </div>
  )
}

export default DashboardServerSlOverview
