import React from 'react';
// import { PieChart, Pie, Sector, Cell } from 'recharts';
import { observer, inject } from 'mobx-react';
import { PieChart } from 'react-minimal-pie-chart'
import { VictoryPie } from "victory-pie";



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ClientAcquisition = inject('clientsStore')(observer((props) => {
  const data_clients = props.clientsStore.clients
  const beforeThisYear = new Date().getFullYear()
  const thisMonth = new Date().getMonth() + 1
  const lastHalfYear = {
    year: beforeThisYear,
    month: thisMonth
  }

  const data = [
    { x: `> 12 month `, y: 0 },
    { x: 'Last Month', y: 0 },
    { x: '6-12 Month', y: 0 }
  ]

  for (let cl of data_clients) {
    let clMonth = parseInt(cl.firstContact.split('/')[0])
    let clYear = parseInt(cl.firstContact.split('/')[2])
    if (clYear < beforeThisYear) {
      data[0].y += 1
      data[0].x = `> 12 month ${data[0].y}`

    }

    if (beforeThisYear - clYear <= 1 && Math.abs(clMonth - thisMonth) <= 6) {
      data[2].y += 1
      data[2].x = `6-12 Month ${data[2].y}`
    }
    if (thisMonth - clYear <= 1 && beforeThisYear === clYear) {
      data[1].y += 1
      data[1].x = `Last Month ${data[1].y}`
    }
  }

  return (
    <VictoryPie
      data={data}
      colorScale={COLORS}
      radius={50}
    />
  );


  // const options = {
  //   exportEnabled: true,
  //   animationEnabled: true,
  //   title: {
  //     text: "Website Traffic Sources"
  //   },
  //   data: [{
  //     type: "pie",
  //     startAngle: 75,
  //     toolTipContent: "<b>{label}</b>: {y}%",
  //     showInLegend: "true",
  //     legendText: "{label}",
  //     indexLabelFontSize: 16,
  //     indexLabel: "{label} - {y}%",
  //     dataPoints: [
  //       { y: 18, label: "Direct" },
  //       { y: 49, label: "Organic Search" },
  //       { y: 9, label: "Paid Search" },
  //       { y: 5, label: "Referral" },
  //       { y: 19, label: "Social" }
  //     ]
  //   }]
  // }
  // return (
  //   <div>
  //     <CanvasJSChart options={options}
  //     /* onRef={ref => this.chart = ref} */
  //     />
  //     {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
  //   </div>
  // );
}))



export default ClientAcquisition

