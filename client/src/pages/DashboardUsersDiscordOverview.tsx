import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import { OverviewDashboardNavbar, Loader, ErrorInfo, SelectPeriod } from "../components";
import { UsersDiscordTopChart } from "../charts";

const DashboardUsersDiscordOverview = () => {
 const {user} = useAuthContext()
 const [usersOverview, setUsersOverview] = useState({
    _id: '',
    guildId: '',
    users: [
      {
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
        ]
      }

    ]
 });
 const [period, setPeriod] = useState(30)
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState(false);
 const [errorMessage, setErrorMessage] = useState('');
 const sumMessageCount = (dailyStats: any[]) => dailyStats.reduce((sum, daily) => sum + daily.messageCount, 0);
 const sumVoiceCount = (dailyStats: any[]) =>
    dailyStats.reduce((sum, daily) => sum + daily.voiceChannelMinutes, 0);
    
 useEffect(()=> {
    const fetchUserOverview = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/dashboard/overview/users-discord', {
          withCredentials: true,
          headers: { 'Authorization': `Bearer ${user.token}` }
          })
          if (response.status === 200) {
            const jsonData = response.data[0];
            setUsersOverview(jsonData);
          }
          setLoading(false);
      } catch (error:any) {  
        if (error.response && error.response.status === 404) {
          setErrorMessage(JSON.stringify(error.response.data.error))
          setError(true);
        } else if(error.response && error.response.status === 400){
          setErrorMessage(JSON.stringify(error.response.data.error))
          setError(true);
        } 
        setLoading(false);
      }
    }

    if(user) {
      fetchUserOverview()
    }
 }, [])
 
  return (
    <div className='text-white flex flex-col w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px] '>    
    <OverviewDashboardNavbar/>

    {
      error ?
      (
         <ErrorInfo errorMessage={errorMessage.toString()}/>

      ) : loading ?
      (
        <Loader />
      ) : (
        <div>
          <SelectPeriod period={period} setPeriod={setPeriod}/>
          
          <div className="flex flex-col sm:flex-row gap-[33px] justify-between w-full">
            
            <UsersDiscordTopChart usersOverview={usersOverview} period={period} itemsPerPage={20} sumFunctionCount={sumMessageCount} text={"Ilość wiadomości:"}/>
            <UsersDiscordTopChart usersOverview={usersOverview} period={period} itemsPerPage={20} sumFunctionCount={sumVoiceCount} text={"Czas na kanałach:"}/>
          </div>
        </div>
      )
    }
  </div>
  )
}

export default DashboardUsersDiscordOverview
