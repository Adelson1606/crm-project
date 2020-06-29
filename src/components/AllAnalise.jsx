import React from 'react';
import { observer, inject } from 'mobx-react';
import '../App.css';
import { useState } from 'react'

import SearchAnal1 from './SearchAnal1';
import TopEmployees from './TopEmployees';
import StaisticIkons from './StaisticIkons';
import ClientAcquisition from './ClientAcquisition';

const AllAnalise = inject('clientsStore')(observer((props) => {
  return (
    <div className='AllAnalise'>
      <div className='h'> <StaisticIkons /> </div>
      <div className='o'> <SearchAnal1 /> </div>
      <div className='t'> <TopEmployees /> </div>
      <div className='f'> <ClientAcquisition /> </div>
    </div>
  )
}))

export default AllAnalise