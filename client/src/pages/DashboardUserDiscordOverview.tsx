import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import Chart from 'react-apexcharts'
import useWindowDimensions from "../hooks/useWindowDimensions";

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
    const fetchUserOverview = async () => {

      const response = await axios.get('http://localhost:5000/dashboard/user-discord-overview', {
      withCredentials: true,
      headers: { 'Authorization': `Bearer ${user.token}` }

      })
      if (response.status === 200) {
        const jsonData = response.data;
        
        setUserOverview(jsonData);

        const categories = jsonData.dailyStats.map((dailyStat: any) => dailyStat.date);
      const seriesData = [
        {
          name: 'Ilość wysłanych wiadomości',
          data: jsonData.dailyStats.map((dailyStat: any) => dailyStat.messageCount),
        },
        {
          name: 'Ilość wysłanych załączników',
          data: jsonData.dailyStats.map((dailyStat: any) => dailyStat.attachmentCount),
        },
        {
          name: 'Ilość wysłanych naklejek',
          data: jsonData.dailyStats.map((dailyStat: any) => dailyStat.stickerCount),
        },
        {
          name: 'Ilość wysłanych linków',
          data: jsonData.dailyStats.map((dailyStat: any) => dailyStat.linkCount),
        },
        {
          name: 'Ilość wysłanych wspomnień użytkowników',
          data: jsonData.dailyStats.map((dailyStat: any) => dailyStat.userMentionCount),
        },
        {
          name: 'Ilość wysłanych wspomnień ról',
          data: jsonData.dailyStats.map((dailyStat: any) => dailyStat.roleMentionCount),
        },
        {
          name: 'Czas spędzony na kanałach głosowych (min)',
          data: jsonData.dailyStats.map((dailyStat: any) => dailyStat.voiceChannelMinutes),
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
      
      fetchUserOverview()
    }
 }, [])
  
 console.log(userOverview)

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
    <div className='text-white flex flex-col lg:flex-row mt-[50px]'>
       <Chart options={chartData.options} series={chartData.series} type="bar" height={chartHeight} width={chartWidth} />

     


    <div className="border p-6">
    <p>User ID: {userOverview.userId}</p>
    <p>User Name: {userOverview.userName}</p>
    <p>Daily Stats:</p>
    <div>
    
       <p>XP Count: {userOverview.dailyStats[userOverview.dailyStats.length - 1].xpCount}</p>
       <p>Level Count: {userOverview.dailyStats[userOverview.dailyStats.length - 1].levelCount}</p>
       <p>Balance: {userOverview.dailyStats[userOverview.dailyStats.length - 1].balance}</p>
       <p>Warn Count: {userOverview.dailyStats[userOverview.dailyStats.length - 1].warnCount}</p>
    </div>

    </div>
    
  </div>
  )
}

export default DashboardUserDiscordOverview
