import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SignUpDialog = ({ open, goSign }) => (
  <Dialog open={open} fullWidth>
    <DialogTitle id="form-dialog-title">Balo Sign Up</DialogTitle>
    <DialogContent>
      <TextField
        id="email"
        label="Email address"
        placeholder="Your email address"
        type="email"
        fullWidth
        required
      />
      <TextField
        id="name"
        label="Username"
        placeholder="Username"
        type="text"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        id="password"
        label="Password"
        placeholder="Your password"
        type="password"
        fullWidth
        margin="normal"
        required
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => goSign(!open)} color="primary">
        Cancel
      </Button>
      <Button onClick={() => { }} color="primary">
        Sign Up
      </Button>
    </DialogActions>
  </Dialog>
)

export default SignUpDialog
