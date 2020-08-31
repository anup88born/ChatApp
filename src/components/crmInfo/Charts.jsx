import React from 'react';
import ReactApexChart from 'react-apexcharts';



function Charts()
{


    const [chartData, setchartData] = React.useState(
        {
            
            series: [{
                data: [44, 55, 41, 64, 22, 43, 21]
              }, {
                data: [53, 32, 33, 52, 13, 44, 32]
              },
            {
                data: [35, 22, 16, 7, 19, 55, 29]
            }
            ],
              options: {
                chart: {
                  type: 'bar',
                  height: 430,
                  width:'100%'
                },
                plotOptions: {
                  bar: {
                    horizontal: true,
                    dataLabels: {
                      position: 'top',
                    },
                  }
                },
                dataLabels: {
                  enabled: true,
                  offsetX: -6,
                  style: {
                    fontSize: '12px',
                    colors: ['#fff']
                  }
                },
                stroke: {
                  show: true,
                  width: 1,
                  colors: ['#fff']
                },
                xaxis: {
                  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                },
            
              },
            
    
          }
    
        );
    return(
        <div id="chart">
        <ReactApexChart options={chartData} series={chartData.series} type="bar" height={430} />
        </div>
        

    );
}
  

 
export default Charts;