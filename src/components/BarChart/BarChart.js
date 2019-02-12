import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class BarChartComponent extends Component {
  render() {
  const typeChart = this.props.typechart;
  let topGrafh = []
  let data = this.props.data;

  switch (typeChart) {
    case "CLIENT":
        data.map((order, idx) => {
          return topGrafh[idx] = {
              ...order.client[0],
              total: order.total
          }
      
        })
      break;
    case "SELLER":
      data.map((order, idx) => {
        return topGrafh[idx] = {
            ...order.seller[0],
            total: order.total
        }
    
      })
    break;
    default:
      break;
  }
  
  console.log(data)
  

    return (
      <BarChart width={600} height={300} data={topGrafh}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="total" fill="#18BC9C" />

      </BarChart>
    );
  }
}

export default BarChartComponent;