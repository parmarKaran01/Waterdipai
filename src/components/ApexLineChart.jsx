import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
  
const ApexLineChart = ({ dateProps, dataPointProps, name}) => {

//   const [options, setOptions] = useState({
//     chart: {
//       id: "basic-bar",
//     },
//     xaxis: {
//       categories: [],
//     },
//   });

//   const [series, setSeries] = useState([{
//     name: "series-1",
//     data: [],
//   }]);

//   // console.log(dateProps, dataPointProps)
// const a = () =>{
//     setOptions({
//         chart: {
//           id: "basic-bar",
//         },
//         xaxis: {
//           categories: dateProps,
//         },
//       })

//       setSeries([{
//         name: "series-1",
//         data: dataPointProps,
//       }])
//       // console.log(dateProps, dataPointProps)
// }

// useEffect(() => {
//   a()

// }, [])



    
    
  

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={{
              chart: {
                id: "basic-bar",
              },
              xaxis: {
                categories: dateProps,
              },
            }}
            series={[{
              name: "series-1",
              data: dataPointProps,
            }]}
            type="area"
            width="500"
          />
        </div>
        <h2>{name}</h2>
      </div>

      {/* <button>Get Chart</button> */}
    </div>
  );
};

export default ApexLineChart;
