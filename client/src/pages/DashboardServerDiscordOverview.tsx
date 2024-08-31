import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import useWindowDimensions from "../hooks/useWindowDimensions";
import { MembersChart, MessagesChart, BasicServerInforChart } from "../charts";
import { DiscordDashboardNavbar, Loader, ErrorInfo } from "../components";

interface UserData {
    guildId: string;
    dailyStats: [{
      date: string;
      verificationLevel: number;
      membersCount: number;
      textChannelsCount: number;
      voiceChannelsCount: number;
      categoryCount: number;
      roleCount: number;
      emojiCount: number;
      stickersCount: number;
      boostCount: number;
      joined: number;
      leaved: number;
      messageCount: number;
      voiceChannelMinutes: number;
    }];
  }

const DashboardServerDiscordOverview = () => {
    const {user} = useAuthContext()
    const { height, width } = useWindowDimensions();
    const [serverOverview, setServerOverview] = useState<UserData>({ 
        guildId: '',
        dailyStats: [
          {
            date: '',
            verificationLevel: 0,
            membersCount: 0,
            textChannelsCount: 0,
            voiceChannelsCount: 0,
            categoryCount: 0,
            roleCount: 0,
            emojiCount: 0,
            stickersCount: 0,
            boostCount: 0,
            joined: 0,
            leaved: 0,
            messageCount: 0,
            voiceChannelMinutes: 0,
          }
        ] });
const [loading, setLoading] = useState(true)
const [error, setError] = useState(false);
const [errorMessage, setErrorMessage] = useState('');

        
        useEffect(()=> {
            const fetchServerOverview = async () => {
              setLoading(true);

              try {
                const response = await axios.get('http://localhost:5000/dashboard/discord/server', {
                  withCredentials: true,
                  headers: { 'Authorization': `Bearer ${user.token}` }
                 })
                  if (response.status === 200) {
                    const jsonData = response.data;
                    setServerOverview(jsonData);
                  }
                  setLoading(false);
                
              } catch (error: any) {
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
    <div className='text-white flex flex-col w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px]'>
    <DiscordDashboardNavbar/>

    {
      error ?
      (
         <ErrorInfo errorMessage={errorMessage.toString()}/>

      ) : loading ? (
        <Loader />
      ) : (
        <div>
          <div className="bg-dark_opacity p-6">
            <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">GoldLegends</h2>
            <BasicServerInforChart serverOverview={serverOverview} chartHeight={width < 420 ? 300 : 400} chartWidth={width < 420 ? '250px' : width > 850 ?'780px': '400px'}/>
          </div>
        
          <div className="bg-dark_opacity p-6">
            <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Ilość osób na serwerze</h2>
            <MembersChart serverOverview={serverOverview} chartHeight={chartHeight} chartWidth={'100%'}/>
          </div>
        

          <div className="bg-dark_opacity p-6">
            <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Wiadomości na kanałach tekstowych</h2>
            <MessagesChart serverOverview={serverOverview} chartHeight={chartHeight} chartWidth={'100%'}/>
          </div>
        </div>
      )
    }



      

  </div>
  )
}

export default DashboardServerDiscordOverview
