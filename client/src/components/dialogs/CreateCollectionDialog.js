import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const CreateCollectionDialog = ({ open, openDialog, sendCollectionData }) => {
  const [inputValue, onChangeInputValue] = useState('')
  const [errorMessage, changeErrorMessage] = useState('')

  const onChange = (e) => {
    onChangeInputValue(e.target.value)
  }

  const createCollection = async () => {
    const collection = await fetch('/api/v1/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: inputValue })
    })

    const response = await collection.json()
    if (response.success) {
      sendCollectionData(response)
      changeErrorMessage('')
    } else {
      changeErrorMessage(response.error)
    }
  }

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Create new collection</DialogTitle>
      <DialogContent>
        <TextField
          id='name'
          label='Collection name'
          placeholder='Collection name'
          type='text'
          fullWidth
          required
          onChange={onChange}
          autoFocus={true}
          error={Boolean(errorMessage)}
          helperText={errorMessage}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { openDialog(false) }} color='primary'>Cancel</Button>
        <Button onClick={createCollection} color='primary' disabled={!inputValue}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateCollectionDialog
