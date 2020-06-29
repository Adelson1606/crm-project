import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { observer, inject } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const SimpleBarChart = inject('clientsStore')(observer((props) => {
  const data_clients = props.clientsStore.clients
  const analyse = {
    country: {},
    emailType: {},
    owner: {}
  }
  const data = { country: null, emailType: null, owner: null }
  const countrydata = []
  const emailData = []
  const ownerData = []
  for (let cl of data_clients) {
    analyse.country[cl.country] ? analyse.country[cl.country] += 1 : analyse.country[cl.country] = 1
    analyse.emailType[cl.emailType] ? analyse.emailType[cl.emailType] += 1 : analyse.emailType[cl.emailType] = 1
    analyse.owner[cl.owner] ? analyse.owner[cl.owner] += 1 : analyse.owner[cl.owner] = 1
  }


  for (let i in analyse.country) {
    countrydata.push({
      country: i,
      amount: analyse.country[i]
    })
  }
  for (let i in analyse.emailType) {
    emailData.push({
      emailType: i,
      amount: analyse.emailType[i]
    })
  }
  for (let i in analyse.owner) {
    ownerData.push({
      owner: i,
      amount: analyse.owner[i]
    })
  }
  data.country = countrydata
  data.emailType = emailData
  data.owner = ownerData

  const filter = props.filter

  return (
    <div>
      <BarChart width={600} height={300} data={data[filter]}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={filter} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />

      </BarChart>

    </div>
  );
}))

export default SimpleBarChart