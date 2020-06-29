import React from 'react';
import { observer, inject } from 'mobx-react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const TopEmployees = inject('clientsStore')(observer((props) => {
  const data_clients = props.clientsStore.clients
  const data =[]
  const analyse = {
  }
  for (let cl of data_clients) {
    if (analyse[cl.owner]) {
      if (cl.sold) {
        analyse[cl.owner] += 1
      }
    } else {
      if(cl.sold){
        analyse[cl.owner] = 1
      } else {
        analyse[cl.owner] = 0
      }
     
    }
  }
  for(let e in analyse){
    data.push({employee: e, sales:analyse[e]})
  }
  
  data.sort(function (a, b) {
    if (a.sales < b.sales) {
      return 1;
    }
    if (a.sales > b.sales) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  });

  data.splice(3,data.length-3)
  return (
    <ComposedChart layout="vertical" width={600} height={400} data={data}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid stroke='#f5f5f5' />
      <XAxis type="number" />
      <YAxis dataKey='employee' type="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey='sales' barSize={50} fill='#413ea0' />
    </ComposedChart>
  )
}))

export default TopEmployees


