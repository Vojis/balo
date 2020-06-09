import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const CreatePairDialog = ({ 
  open,
  shouldDialogBeOpen,
  getPairData,
  pairData, 
  onSavePairs
}) => (
  // todo: show error if input has > 500 characters
  <Dialog open={open} fullWidth maxWidth='md'>
    <DialogTitle>Create a new pair</DialogTitle>
    <DialogContent>
      <TextField
        label='Original'
        placeholder='Enter your text here'
        type='text'
        fullWidth
        required
        onChange={e => getPairData({ ...pairData, language1: e.target.value })}
      />
      <TextField
        label='Translation'
        placeholder='Enter your translation here'
        type='text'
        fullWidth
        margin='normal'
        required
        onChange={e => getPairData({ ...pairData, language2: e.target.value })}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => { shouldDialogBeOpen(false) }} color='primary'>Cancel</Button>
      <Button onClick={onSavePairs} color='primary' disabled={!pairData.language1 || !pairData.language2}>Save</Button>
    </DialogActions>
  </Dialog>
)

export default CreatePairDialog
