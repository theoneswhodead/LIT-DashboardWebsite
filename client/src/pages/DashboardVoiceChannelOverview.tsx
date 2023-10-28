import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import useWindowDimensions from "../hooks/useWindowDimensions";
import { VoiceChannelMinutesChart } from "../charts";

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
              voiceChannelMinutes: 0,
            }
          ]
    }   
    ]
 });
  const [selectedChannel, setSelectedChannel] = useState<any>(null);


  useEffect(()=> {
    const fetchServerOverview = async () => {

      const response = await axios.get('http://localhost:5000/dashboard/voice-channel-overview', {
      withCredentials: true,
      headers: { 'Authorization': `Bearer ${user.token}` }

      })
      if (response.status === 200) {
        const jsonData = response.data; // one server temp
        
        setTextChannelOverview(jsonData);
        
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
  <div className='text-white flex flex-col mt-[187px] sm:pl-[275px] lg:pl-[315px] w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px]'>
    <select
      className="bg-transparent text-[16px] sm:text-[24px] uppercase font-black w-[300px] mb-[24px]"
      value={selectedChannel?.channelId || ''}
      onChange={(e) => {
        const channelId = e.target.value;
        const selected = textChannelOverview[0]?.channels.find((channel: any) => channel.channelId === channelId);
        setSelectedChannel(selected);
      }}
    >
      <option value="" className="bg-black">Wybierz kanał</option>
      {textChannelOverview[0]?.channels.map((channel: any) => (
        <option
          className="bg-black"
          key={channel.channelId}
          value={channel.channelId}
        >
          {channel.channelName}
        </option>
      ))}
    </select>

    {selectedChannel && 

      <div className="pb-[30px]">
        <div>
          <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Czas na kanale głosowym (min)</h2>
          <VoiceChannelMinutesChart selectedChannel={selectedChannel} chartHeight={chartHeight} chartWidth={'100%'}/>
        </div>
      </div>
    
    }

  </div>
  );
}

export default DashboardTextChannelOverview
