import { useEffect, useState  } from "react"
import Chart from 'react-apexcharts'

const UserSLPlayTimeChart = ({ userSlOverview, chartHeight, chartWidth }: { userSlOverview: any, chartHeight: number, chartWidth: string }) => {

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
            size: 3,
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve:  'smooth' as 'smooth',
            width: [3],
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
                text: 'Czas gry (min)',
                style: {
                  color: '#008FFB',
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

    const categories = userSlOverview.dailyStats.map((dailyStat: any) => dailyStat._id);

    const seriesData = [
       {
            name: 'Czas gry (min)',
            type: 'line',
            data: userSlOverview.dailyStats.map((dailyStat: any) => (Math.floor(dailyStat.onlineTime/60).toFixed(2))),
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
    }, [userSlOverview])

  return (
    <div>
      <Chart options={chartData.options} series={chartData.series} height={chartHeight} width={chartWidth} />
    </div>
  )
}

export default UserSLPlayTimeChart
