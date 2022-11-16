import React from 'react'
import { Line } from "react-chartjs-2"
import "./Card.css"
import { Chart as ChartJS} from "chart.js/auto"

function LineChart({ dateProps, datapointProps }) {
    const dates =  ['2021-08-25', '2021-08-26','2021-08-27','2021-08-28', '2021-08-29', '2021-08-30','2021-08-31' ];
    const datapoints = datapointProps
    // console.log(dateProps);
  return (
    <div className='card_container'>
        <Line data={{
            labels: dates,
            datasets:[{
                label:"Visitors",
                data:datapoints
            }]
        }}
        />
    </div>
  )
}

export default LineChart