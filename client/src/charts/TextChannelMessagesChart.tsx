import { useEffect, useState  } from "react"
import Chart from 'react-apexcharts'

const TextChannelMessagesChart = ({ selectedChannel, chartHeight, chartWidth }: { selectedChannel: any, chartHeight: number, chartWidth: string }) => {

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
        width: [3, 0, 0, 0, 0, 0],
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
            text: 'Ilość wiadomości',
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

  
  const categories = selectedChannel?.dailyStats.map((dailyStat: any) => dailyStat.date)

const seriesData = [
  {
    name: 'Ilość wysłanych wiadomości',
    type: 'line',
    data: selectedChannel?.dailyStats.map((dailyStat: any) => dailyStat.messageCount
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

}, [selectedChannel])
  
  return (
    <div>
        <Chart options={chartData.options} series={chartData.series} height={chartHeight} width={chartWidth} />
    </div>
  )
}

export default TextChannelMessagesChart
