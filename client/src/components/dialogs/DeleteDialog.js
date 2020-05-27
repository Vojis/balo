import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const DeleteCollectionDialog = ({ open, name, collectionId, openDialog, onUpdate }) => {
  const [inputValue, onChangeInputValue] = useState(name)

  const changeName = async () => {
    const deletedCollection = await fetch(`/api/v1/collections/${collectionId}`, { method: 'DELETE' })

    const response = await deletedCollection.json()
    if (response.success) {
      openDialog(false)
      onUpdate()
    }
  }

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Delete</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete <b>{name}</b> collection?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => openDialog(false)} color='primary'>Cancel</Button>
        <Button onClick={changeName} color='primary' disabled={!inputValue}>
          <Typography color='secondary'>Delete</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteCollectionDialog
