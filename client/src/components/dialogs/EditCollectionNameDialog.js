import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const EditCollecitonNameDialog = ({ 
  open,
  name,
  collectionId,
  openDialog,
  onUpdate
}) => {
  // state
  const [inputValue, onChangeInputValue] = useState(name)
  const [errorMessage, changeErrorMessage] = useState('')

  const onChange = (e) => {
    onChangeInputValue(e.target.value)
  }

  const changeName = async () => {
    const updatedCollection = await fetch(`/api/v1/collections/${collectionId}`, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: inputValue })
    })

    const response = await updatedCollection.json()
    if (response.success) {
      openDialog(false)
      onUpdate()
    } else {
      changeErrorMessage(response.error)
    }
  }

  const onClose = () => {
    onChangeInputValue(name)
    openDialog(false)
  }

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Change collection name</DialogTitle>
      <DialogContent>
        <TextField
          id='name'
          label='Collection name'
          placeholder='Collection name'
          type='text'
          fullWidth
          required
          value={inputValue}
          onChange={onChange}
          autoFocus={true}
          error={Boolean(errorMessage)}
          helperText={errorMessage}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>Cancel</Button>
        <Button onClick={changeName} color='primary' disabled={!inputValue}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditCollecitonNameDialog
