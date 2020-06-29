import React from 'react';
import { observer, inject } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react'
import SimpleChart from './SimpleChart'



const useStyles = makeStyles((theme) => ({
  root_1: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const SearchAnal1 = inject('clientsStore')(observer((props) => {
  const classes = useStyles();
  const [searchVariant, setSearchVariant] = useState('country')

  const searchVariants = [

    {
      value: 'country',
      label: 'Country',
    },
    {
      value: 'owner',
      label: 'Owner',
    },
    {
      value: 'emailType',
      label: 'Email',
    },
  ];


  const handleChange = (e) => {
    setSearchVariant(e.target.value)
  };



  return (
    <div>
      <form className={classes.root_1} noValidate autoComplete="off">
        <TextField
          id="standard-select-currency"
          select
          label="Select"
          value={searchVariant}
          onChange={handleChange}
          helperText="Please select search parameter"
        >
          {searchVariants.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </form>
      <SimpleChart filter={searchVariant} />
    </div>
  )
}))

export default SearchAnal1