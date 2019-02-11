import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class BarChartComponent extends Component {
  render() {
  let data = this.props.data;
  let topClientsGrafh = []
  
  data.map((order, idx) => {
    return topClientsGrafh[idx] = {
        ...order.client[0],
        total: order.total
    }

  })

    return (
      <BarChart width={600} height={300} data={topClientsGrafh}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="namecomplete"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="total" fill="#18BC9C" />

      </BarChart>
    );
  }
}

export default BarChartComponent;