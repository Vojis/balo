import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LogInDialog = ({ open, goLog, loginData, changeLoginData, login, error }) => (
  <Dialog open={open} fullWidth>
    <DialogTitle>Balo Log In</DialogTitle>
    <DialogContent>
      <TextField
        id='email'
        label='Email address'
        placeholder='Your email address'
        type='email'
        fullWidth
        required
        defaultValue={loginData.email}
        onBlur={e => changeLoginData({ ...loginData, email: e.target.value })}
        error={error.status}
        helperText={error.message}
      />
      <TextField
        id='password'
        label='Password'
        placeholder='Your password'
        type='password'
        fullWidth
        margin='normal'
        required
        defaultValue={loginData.password}
        onBlur={e => changeLoginData({ ...loginData, password: e.target.value })}
        error={error.status}
        helperText={error.message}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => goLog(!open)} color='primary'>Cancel</Button>
      <Button onClick={login} color='primary'>Login</Button>
    </DialogActions>
  </Dialog>
)

export default LogInDialog
