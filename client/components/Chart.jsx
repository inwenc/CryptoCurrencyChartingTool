import { Line, Scatter } from 'react-chartjs-2';
import React from 'react';


var Chart = (props) => {
// console.log('props data labels', props.data[labels])
// console.log('props data', props.data[datasets])
  return (
    <div className="chart">
      <Line
      data={
      props.data}
       options ={
{}
      }/>
    </div>
  )
}


export default Chart;