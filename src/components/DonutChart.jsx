import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const DonutChart = ({ countryProps, dataPointProps }) => {
  console.log(countryProps, dataPointProps);
  const [options, setOptions] = useState({
    chart: {
      type: "pie",
      height: 500,
    },
    plotOptions: {
      pie: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: countryProps,
    },
  });

  const [series, setSeries] = useState(dataPointProps);

  //   console.log(dateProps, dataPointProps)
  // const a = () => {
  //   setOptions({
  //     chart: {
  //       type: "pie",
  //       height: 500,
  //     },
  //     plotOptions: {
  //       pie: {
  //         borderRadius: 4,
  //         horizontal: true,
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     xaxis: {
  //       categories: countryProps,
  //     },
  //   });

  //   setSeries(dataPointProps);
  // };

  // useEffect(() => {
  //   a();
  // }, []);

  //   this.state = {

  //     series: [{
  //       data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
  //     }],
  //     options: {
  //       chart: {
  //         type: 'pie',
  //         height: 350
  //       },
  //       plotOptions: {
  //         pie: {
  //           borderRadius: 4,
  //           horizontal: true,
  //         }
  //       },
  //       dataLabels: {
  //         enabled: false
  //       },
  //       xaxis: {
  //         categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
  //           'United States', 'China', 'Germany'
  //         ],
  //       }
  //     },

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={{
              chart: {
                type: "pie",
                height: 500,
              },
              plotOptions: {
                pie: {
                  borderRadius: 4,
                  horizontal: true,
                },
              },
              dataLabels: {
                enabled: false,
              },
              xaxis: {
                categories: countryProps,
              },
            }}
            series={dataPointProps}
            type="pie"
            width="500"
          />
        </div>
      </div>
      <h2>Total People According to countries</h2>
    </div>
  );
};

export default DonutChart;
