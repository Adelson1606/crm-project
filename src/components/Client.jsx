import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  table: {
    cursor: 'pointer'
  }
})
const Client = inject("clientsStore")(observer((props) => {
  const classes = useStyles()
  const value = props.value
  const column = props.column

  const handleOpenModal = () => {
    props.handleOpenModal(props.client)
  }


  return (
    <TableCell className={classes.table} key={column.id} align={column.align} onDoubleClick={handleOpenModal}>
      {value === null ? '-' : value === true ? 'yes' : value}
    </TableCell>
  )
}))



export default Client



