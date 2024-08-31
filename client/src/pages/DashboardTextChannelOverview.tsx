import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

import { TextChannelMessagesChart, TextChannelOtherChart } from "../charts";
import { DiscordDashboardNavbar, Loader, ErrorInfo} from "../components";

const DashboardTextChannelOverview = () => {
  const { user } = useAuthContext();
  const { height, width } = useWindowDimensions();
  const [textChannelOverview, setTextChannelOverview] = useState<any>({ 
    guildId: '',
    channels: [{
        channelId: '',
        channelName: '',
        dailyStats: [
            {
              date: '',
              messageCount: 0,
              attachmentCount: 0,
              stickerCount: 0,
              linkCount: 0,
              userMentionCount: 0,
              roleMentionCount: 0,
            }
          ]
    }   
    ]
 });
  const [selectedChannel, setSelectedChannel] = useState<any>(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');



  useEffect(()=> {
    const fetchServerOverview = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/dashboard/discord/text', {
          withCredentials: true,
          headers: { 'Authorization': `Bearer ${user.token}` }
          })

          if (response.status === 200) {
            const jsonData = response.data;
            setTextChannelOverview(jsonData);
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
 }, [selectedChannel])

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

      ) : loading ?
      (
        <Loader />
      ) : (
        <div>
              <select
      className="bg-dark_opacity p-6 text-[16px] sm:text-[24px] uppercase font-black w-[300px] mb-[24px] "
      value={selectedChannel?.channelId || ''}
      onChange={(e) => {
        const channelId = e.target.value;
        const selected = textChannelOverview?.channels.find((channel: any) => channel.channelId === channelId);
        setSelectedChannel(selected);
      }}
    >
      <option value="" className="bg-black">Wybierz kanał</option>
      {textChannelOverview?.channels.map((channel: any) => (
        <option
          className="bg-black"
          key={channel.channelId}
          value={channel.channelId}
        >
          #{channel.channelName}
        </option>
      ))}
    </select>
    {selectedChannel &&
     (
      <div className="flex flex-col gap-[33px]">
        
        <div className="bg-dark_opacity p-6">
          <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Wysłane wiadomości:</h2>
            <TextChannelMessagesChart selectedChannel={selectedChannel} chartHeight={chartHeight} chartWidth={'100%'}/>
        </div>

        <div className="bg-dark_opacity p-6">
          <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Inne wysłane:</h2>
          <TextChannelOtherChart selectedChannel={selectedChannel} chartHeight={chartHeight} chartWidth={'100%'}/>
        </div>
      </div>

     )}
        </div>
      )
    }

  </div>
  );
}

export default DashboardTextChannelOverview
