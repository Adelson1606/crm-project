import React, { forwardRef, useImperativeHandle } from 'react';
import Modal from './Modal'
import axios from 'axios'
import { TextField, makeStyles } from '@material-ui/core';


const stylesheet = makeStyles({
  row: {
    display: 'flex',
    flexDirection: 'column'
  },
});

const ClientEditor = forwardRef((props, ref) => {

  const [show, setShow] = React.useState(false)
  const [client, setClient] = React.useState({
    name: '',
    surname: '',
    country: ''
  });

  const [id, setId] = React.useState(null);


  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => {

    return {

      editClient: (client) => {
        setClient({
          name: client.name || '',
          surname: client.surname || '',
          country: client.country || ''
        })
        setId(client.id)

        setShow(true)
      }

    }
  });



  const handleOk = async () => {
    const upClient = {
      name: client.name + ' ' + client.surname,
      country: client.country
    }
    await axios.put(`http://localhost:8080/clients/${id}`, upClient)
    props.handleUpdatedClient(client, id)
    setShow(false)
  }

  const handleCancel = () => {
    setShow(false)
  }

  const handleInput = e => {
    const prop = e.target.name

    setClient({
      ...client,
      [prop]: e.target.value
    })
  }




  const classes = stylesheet();

  return (
    <Modal openModal={show} handleOk={handleOk} handleCancel={handleCancel}>
      <form noValidate autoComplete="off" className={classes.row}>
        <TextField label="Name" name='name' value={client.name} onChange={handleInput} />
        <TextField label='Surname' name='surname' value={client.surname} onChange={handleInput} />
        <TextField label="Country" name='country' value={client.country} onChange={handleInput} />
      </form>
    </Modal >
  );

})


export default ClientEditor


