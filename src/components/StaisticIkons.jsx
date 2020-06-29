import React from 'react'
import { observer, inject } from 'mobx-react';
import { useState } from 'react'
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PublicIcon from '@material-ui/icons/Public';
import { Clients } from './../stores/Clients';

const StaisticIkons = inject('clientsStore')(observer((props) => {
  const data_clients = props.clientsStore.clients
  const topCountry = []
  const emailsSend = data_clients.filter(cl => cl.emailType !== '-').length
  const outstanding = data_clients.filter(cl => cl.emailType === '-').length
  const date = new Date()
  const nowMonth = date.getMonth() + 1
  const nowYear = date.getFullYear()
  let newClients = 0
  for (let cl of data_clients) {
    let clMonth = parseInt(cl.firstContact.split('/')[0])
    let clYear = parseInt(cl.firstContact.split('/')[2])
    if (clYear === nowYear && clMonth >= nowMonth) {
      newClients += 1
    }
  }

  const analyse = {
  }
  for (let cl of data_clients) {
    if (analyse[cl.country]) {
      if (cl.sold) {
        analyse[cl.country] += 1
      }
    } else {
      if (cl.sold) {
        analyse[cl.country] = 1
      } else {
        analyse[cl.country] = 0
      }

    }
  }
  for (let e in analyse) {
    topCountry.push({ country: e, sales: analyse[e] })
  }

  topCountry.sort(function (a, b) {
    if (a.sales < b.sales) {
      return 1;
    }
    if (a.sales > b.sales) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  });

  const hot = topCountry.splice(1, topCountry.length - 1)[0]
  const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const nowMonthName = monthes[nowMonth - 1]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', justifyItems: 'center', alignContent: "center", height:'100px' }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'center', alignContent: "center" }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: "#f1c40f", display: 'flex', justifyContent: 'center', alignItems: "center" }}>
          <PublicIcon style={{ color: 'white', fontSize: '40px' }} />
        </div>
        <div>
          <div style={{ fontSize: '30px' }}>{hot?.country} </div>
          <div>hottest country</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'center', alignContent: "center", height:'100px'}}>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: "#2ecc71", display: 'flex', justifyContent: 'center', alignItems: "center" }}>
          <TrendingUpIcon style={{ color: 'white', fontSize: '40px' }} />
        </div>
        <div>
          <div style={{ fontSize: '30px' }}>{newClients}</div>
          <div>New Clients in {nowMonthName}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'center', alignContent: "center", height:'100px' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: "#3498db", display: 'flex', justifyContent: 'center', alignItems: "center" }}>
          <EmailIcon style={{ color: 'white', fontSize: '40px' }} />
        </div>
        <div>
          <div style={{ fontSize: '30px' }}> {emailsSend}</div>
          <div>Emails Sent</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'center', alignContent: "center", height:'100px' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: "#e74c3c", display: 'flex', justifyContent: 'center', alignItems: "center" }}>
          <AccountCircleIcon style={{ color: 'white', fontSize: '40px' }} />
        </div>
        <div>
          <div style={{ fontSize: '30px' }}>{outstanding}</div>
          <div>Outstanding Clients</div>
        </div>
      </div>

    </div>
  )
}))
export default StaisticIkons