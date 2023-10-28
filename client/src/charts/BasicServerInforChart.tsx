import { useEffect, useState  } from "react"
import Chart from 'react-apexcharts'

const BasicServerInforChart = ({ serverOverview, chartHeight, chartWidth }: { serverOverview: any, chartHeight: number, chartWidth: string }) => {

    const [chartData, setChartData] = useState({
        series: [
            {
                data: [],
            }
            
        ],
        options: {
          chart: {
            height: 390,
            type: 'radialBar' as 'radialBar',
          },
          plotOptions: {
            radialBar: {
              offsetY: 0,
              startAngle: -135,
              endAngle: 135,
              hollow: {
                margin: 15,
                size: '20%',
                background: 'transparent',
                image: undefined,
              },
              dataLabels: {
                name: {
                    offsetY: 145,
                  show: true,
                  fontSize: '20px'
                },
                value: {
                    offsetY: 90,
                  show: true,
                  color: '#ff0000',
                  fontSize: '40px',
                  fontWeight: 'bold',
                  formatter: function (w: any) {
                    return w
                  }

                },
              },
            },
          },
          labels: ['Poziom weryfikacji', 'Ilość kanałów tekstowych', 'Ilość kanałów głosowych', 'Ilość kategorii', 'Ilość ról', 'Ilość emoji', 'Ilość naklejek', 'Ilość boostów'],
          legend: {
            show: true,
            floating: true,
            fontSize: '16px',
            position: 'left' as 'left',
            // offsetX: 160,
            offsetY: 15,
            labels: {
              useSeriesColors: true,
            },
            formatter: function (seriesName: any, opts: any) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
            },
            itemMargin: {
              vertical: 6,
            },
          },
          responsive: [
            {
              breakpoint: 850,
              options: {
                legend: {
                  show: false,
                },
                
              },
            },

          ],
        },
      });

      const seriesData = [
       serverOverview.dailyStats[serverOverview.dailyStats.length - 1].verificationLevel,
       serverOverview.dailyStats[serverOverview.dailyStats.length - 1].textChannelsCount,
       serverOverview.dailyStats[serverOverview.dailyStats.length - 1].voiceChannelsCount,
       serverOverview.dailyStats[serverOverview.dailyStats.length - 1].categoryCount,
       serverOverview.dailyStats[serverOverview.dailyStats.length - 1].roleCount,
       serverOverview.dailyStats[serverOverview.dailyStats.length - 1].emojiCount,
       serverOverview.dailyStats[serverOverview.dailyStats.length - 1].stickersCount,
       serverOverview.dailyStats[serverOverview.dailyStats.length - 1].boostCount
      ];
    
     useEffect(() => {
      setChartData({
        ...chartData,
        options: {
          ...chartData.options,
        },
        series: seriesData,
      });
     }, [serverOverview])



  return (
      <div className="flex justify-center sm:block">
          <Chart options={chartData.options} series={chartData.series} height={chartHeight} type="radialBar" width={chartWidth} />
      </div>
  )
}

export default BasicServerInforChart
