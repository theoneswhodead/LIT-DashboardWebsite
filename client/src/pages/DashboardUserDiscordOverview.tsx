import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import useWindowDimensions from "../hooks/useWindowDimensions";
import { UserMessagesChart, UserVoiceChart } from "../charts";

interface UserData {
  userId: string;
  userName: string;
  dailyStats: [{
    date: string;
    messageCount: number;
    attachmentCount: number;
    stickerCount: number;
    linkCount: number;
    userMentionCount: number;
    roleMentionCount: number;
    voiceChannelMinutes: number;
    xpCount: number;
    levelCount: number;
    balance: number;
    warnCount: number;
  }];

}

const DashboardUserDiscordOverview = () => {
 const {user} = useAuthContext()
 const { height, width } = useWindowDimensions();
 const [userOverview, setUserOverview] = useState<UserData>({ 
  userId: '',
  userName: '',
  dailyStats: [
    {
      date: '',
      messageCount: 0,
      attachmentCount: 0,
      stickerCount: 0,
      linkCount: 0,
      userMentionCount: 0,
      roleMentionCount: 0,
      voiceChannelMinutes: 0,
      xpCount: 0,
      levelCount: 0,
      balance: 0,
      warnCount: 0,
    }
  ] });

 

 useEffect(()=> {
    const fetchUserOverview = async () => {

      const response = await axios.get('http://localhost:5000/dashboard/user-discord-overview', {
      withCredentials: true,
      headers: { 'Authorization': `Bearer ${user.token}` }

      })
      if (response.status === 200) {
        const jsonData = response.data;
        
        setUserOverview(jsonData);


      }
    }
    if(user) {
      
      fetchUserOverview()
    }
 }, [])
  

 let chartHeight = 400;
 if(height > chartHeight){
   if(width < 420) {
     chartHeight = 250
   } 
 } 


  return (
    <div className='text-white flex flex-col mt-[187px] sm:pl-[275px] lg:pl-[315px] w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px] '>

    <div className="border p-6">
      <p>User ID: <span className=" text-dark_red">{userOverview.userId}</span></p>
      <p>User Name: <span className=" text-dark_red uppercase">{userOverview.userName}</span></p>
      <div>
        <p>XP Count: <span className=" text-dark_red">{userOverview.dailyStats[userOverview.dailyStats.length - 1].xpCount}</span></p>
        <p>Level Count: <span className=" text-dark_red">{userOverview.dailyStats[userOverview.dailyStats.length - 1].levelCount}</span></p>
        <p>Balance: <span className=" text-dark_red">{userOverview.dailyStats[userOverview.dailyStats.length - 1].balance}</span></p>
        <p>Warn Count: <span className=" text-dark_red">{userOverview.dailyStats[userOverview.dailyStats.length - 1].warnCount}</span></p>
      </div>
    </div>

    <div>
        <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Ilość wiadomości</h2>
        <UserMessagesChart userOverview={userOverview} chartHeight={width < 420 ? 350 : 400} chartWidth={'100%'}/>
    </div>

    <div>
        <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Czas na kanałach głosowych</h2>
        <UserVoiceChart userOverview={userOverview} chartHeight={chartHeight} chartWidth={'100%'}/>
    </div>
    
  </div>
  )
}

export default DashboardUserDiscordOverview
