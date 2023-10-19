import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import useWindowDimensions from "../hooks/useWindowDimensions";

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

  const [chartData, setChartData] = useState({
    series: [
      {
        name: '',
        data: [],
      },
    ],
    options: {

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: 'Ilość',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: function (val: any) {
            return  val ;
          },
        },
      },
      chart: {
        foreColor: '#ccc',
        toolbar: {
          show: false
        },
      },
    },
  });

  useEffect(()=> {
    const fetchServerOverview = async () => {

      const response = await axios.get('http://localhost:5000/dashboard/text-channel-overview', {
      withCredentials: true,
      headers: { 'Authorization': `Bearer ${user.token}` }

      })
      if (response.status === 200) {
        const jsonData = response.data; // one server temp
        
        setTextChannelOverview(jsonData);
        const categories = selectedChannel?.dailyStats.map((dailyStat: any) => dailyStat.date)

const seriesData = [
  {
    name: 'Ilość wysłanych załączników',
    data: selectedChannel?.dailyStats.map((dailyStat: any) => dailyStat.attachmentCount
    ),
  },
  {
    name: 'Ilość wysłanych linków',
    data: selectedChannel?.dailyStats.map((dailyStat: any) => dailyStat.linkCount
    ),
  },
  {
    name: 'Ilość wysłanych wiadomości',
    data: selectedChannel?.dailyStats.map((dailyStat: any) => dailyStat.messageCount
    ),
  },
  {
    name: 'Ilość wysłanych wspomnień ról',
    data: selectedChannel?.dailyStats.map((dailyStat: any) => dailyStat.roleMentionCount
    ),
  },
  {
    name: 'Ilość wysłanych naklejek',
    data: selectedChannel?.dailyStats.map((dailyStat: any) => dailyStat.stickerCount),
  },
  {
    name: 'Ilość wysłanych wspomnień użytkowników',
    data: selectedChannel?.dailyStats.map((dailyStat: any) => dailyStat.userMentionCount),
  },
];

setChartData({
  ...chartData,
  options: {
    ...chartData.options,
    xaxis: {
      categories,
    },
  },
  series: seriesData,
});
      }
    }
    if(user) {
      
      fetchServerOverview()
    }
 }, [selectedChannel])


let chartHeight = 300;
let chartWidth = 300;

if(height > chartHeight){
if(width > 768) {
    chartHeight = 400
} else {
    
    if(width > 1000) {
        chartHeight = 400
    } else if(width > 1440){
        chartHeight = 500
    }
}
}
if(width > chartWidth) {
  if(width < 768) {
      chartWidth = width
  } else {
      if(width < 1440) {
      if(width > 1000) {
          chartWidth = 800
      } else {
          chartWidth = 500
      }
      } else {
      chartWidth = 1000
      }
  }
}

return (
  <div className="text-white flex flex-col  mt-[50px]">
    <select
      className="bg-transparent"
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
    {selectedChannel && (
      <Chart options={chartData.options} series={chartData.series} type="bar" height={chartHeight} width={chartWidth} />
    )}
  </div>
  );
}

export default DashboardTextChannelOverview
