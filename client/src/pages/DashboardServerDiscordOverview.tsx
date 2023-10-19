import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import Chart from 'react-apexcharts'
import useWindowDimensions from "../hooks/useWindowDimensions";

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

const MembersChart = ({ serverOverview, chartHeight, chartWidth }: { serverOverview: any, chartHeight: number, chartWidth: number }) => {

  const [chartData, setChartData] = useState({
    series: [
      {
        name: '',
        type: '',
        data: [],
      },
    ],
    options: {
      dataLabels: {
        enabled: false,
      },
      stroke: {
         width: [0, 0, 3],

      },
      title: {
        text: 'Ilość osób, które dołączyły',
        //align: 'left',
        offsetX: 110,
      },
      xaxis: {
        categories: [],
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB',
          },
          labels: {
            style: {
              colors: '#008FFB',
            },
          },
          title: {
            text: 'ilość osób, które dołączyłty',
            style: {
              color: '#008FFB',
            },
          },
        },
        {
          seriesName: 'Ilość osób, które wyszły',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396',
          },
          labels: {
            style: {
              colors: '#00E396',
            },
          },
          title: {
            text: 'Ilość osób, które wyszły', //real
            style: {
              color: '#00E396',
            },
          },
        },
        {
          seriesName: 'Liczba członków serwera',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019',
          },
          labels: {
            style: {
              colors: '#FEB019',
            },
            
          },
          title: {
            text: 'Liczba członków serwera',
            style: {
              color: '#FEB019',
            },
          },
        },
      ],
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
          show: true
        },
      },
      

    }
  })

 // console.log('serverOverview ', serverOverview.dailyStats)

  const categories = serverOverview.dailyStats.map((dailyStat: any) => dailyStat.date);

  const seriesData = [
    {
      name: 'Ilość nowych osób',
      type: 'column',
      data: serverOverview.dailyStats.map((dailyStat: any) => dailyStat.
      joined),
    },
    {
      name: 'Ilość osób, które wyszły',
      type: 'column',
      data: serverOverview.dailyStats.map((dailyStat: any) => dailyStat.
      leaved),
    },
    {
      name: 'Liczba członków',
      type: 'line',
      data: serverOverview.dailyStats.map((dailyStat: any) => dailyStat.membersCount
      ),
    },
  ];

 useEffect(() => {
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
 }, [serverOverview])





  return (
    <div >
             <Chart options={chartData.options} series={chartData.series} height={chartHeight} width={chartWidth} />
    </div>
  );
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
            title: {
              text: 'Ilość wiadomości i czas spędzony na kanałach głosowych',
              //align: 'left',
              offsetX: 110,
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
        
              const response = await axios.get('http://localhost:5000/dashboard/server-discord-overview', {
              withCredentials: true,
              headers: { 'Authorization': `Bearer ${user.token}` }
        
              })
              if (response.status === 200) {
                const jsonData = response.data[0]; // one servwr temp
                
                setServerOverview(jsonData);

                const categories = jsonData.dailyStats.map((dailyStat: any) => dailyStat.date);

                 const seriesData = [
                  {
                    name: 'Ilość wiadomości',
                    data: jsonData.dailyStats.map((dailyStat: any) => dailyStat.
                    messageCount),
                  },
                  {
                    name: 'Czas spędzony na kanałach głosowych (min)',
                    data: jsonData.dailyStats.map((dailyStat: any) => dailyStat.
                    voiceChannelMinutes),
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
         }, [])

       // console.log('serverOverview ', serverOverview)

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
    <div className='text-white flex flex-col  mt-[50px]'>
      <div className="border p-6">
      <p>Server ID: {serverOverview.guildId}</p>
      <p>Server Stats:</p>
      <div>
        <p>Poziom weryfikacji: {serverOverview.dailyStats[serverOverview.dailyStats.length - 1].verificationLevel}</p>
        <p>Ilość kanałów tekstowych: {serverOverview.dailyStats[serverOverview.dailyStats.length - 1].textChannelsCount}</p>
        <p>Ilość kanałów głosowych: {serverOverview.dailyStats[serverOverview.dailyStats.length - 1].voiceChannelsCount}</p>
        <p>Ilość kategorii: {serverOverview.dailyStats[serverOverview.dailyStats.length - 1].categoryCount}</p>
        <p>Ilość ról: {serverOverview.dailyStats[serverOverview.dailyStats.length - 1].roleCount}</p>
        <p>Ilość emoji: {serverOverview.dailyStats[serverOverview.dailyStats.length - 1].emojiCount}</p>
        <p>Ilość naklejek: {serverOverview.dailyStats[serverOverview.dailyStats.length - 1].stickersCount}</p>
        <p>Ilość boostów: {serverOverview.dailyStats[serverOverview.dailyStats.length - 1].boostCount}</p>
      </div>
    </div>
       <Chart options={chartData.options} series={chartData.series} type="bar" height={chartHeight} width={chartWidth} />

      <MembersChart serverOverview={serverOverview} chartHeight={chartHeight} chartWidth={chartWidth}/>

  </div>
  )
}

export default DashboardServerDiscordOverview
