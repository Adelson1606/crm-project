import React from 'react';
import { inject, observer } from 'mobx-react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';




const Modal = inject("clientsStore")(observer((props) => {

const handleOk =()=>{
  props.handleOk()
}
const handleCancel =()=>{
  props.handleCancel()
}
  return (
    <Dialog open={props.openModal} onClose={handleCancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Update Client</DialogTitle>
      <DialogContent>
          {props.children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}))

export default Modal