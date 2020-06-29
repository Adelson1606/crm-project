import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react'
import { inject, observer } from 'mobx-react'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const AddClient = inject("clientsStore")(observer((props) => {
  const classes = useStyles();

  const [input, setInput] = useState({
    name: "",
    surname: "",
    country: "",
    owner: ""
  })

  const handleInput = e => {
    let inputVal = { ...input }
    inputVal[e.target.name] = e.target.value
    setInput(inputVal)
  }
  const addClient = () => {
    const name = input.name 
    const surname = input.surname 
    const country = input.country 
    const owner = input.owner 
    debugger
    props.clientsStore.addClient(name, surname, country, owner)
   
  }
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="name-add" label="Name" name='name' onChange={handleInput} />
      <TextField id="surname-add" label="Surname" name='surname' onChange={handleInput} />
      <TextField id="country-add" label="Country" name='country' onChange={handleInput} />
      <TextField id="owner-add" label="Owner" name='owner' onChange={handleInput} />
      <Button variant="contained" color="primary" disableElevation onClick={addClient}>Add Client</Button>
    </form>
  );
}))



export default AddClient