import { Line, Scatter } from 'react-chartjs-2';
import React from 'react';


var Chart = (props) => {

  return (
    <div className="chart">
      <Line
      data={
      props.data}
       options = {
        {}
      }/>
    </div>
  )
}


export default Chart;