import { useEffect, useState  } from "react"
import Chart from 'react-apexcharts'

const MembersChart = ({ serverOverview, chartHeight, chartWidth }: { serverOverview: any, chartHeight: number, chartWidth: string }) => {

    const [chartData, setChartData] = useState({
      series: [
        {
          name: '',
          type: '',
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
        theme: {
          mode: 'dark' as 'dark',
          palette: 'palette1', 
        },
        markers: {
          size: 5,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve:  'smooth' as 'smooth',
          width: [0, 0, 3],
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
              text: 'Ilość osób, które dołączyły',
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
              text: 'Ilość osób, które wyszły',
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
          y: {
            formatter: function (val: any) {
              return  val ;
            },
          },
        },
     
        chart: {
          foreColor: '#ccc',
          background: 'transparent',
          toolbar: {
            show: true
          },
        },
      }
    })
  
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

export default MembersChart