import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LogInDialog = ({ open, goLog, loginData, changeLoginData, login, error }) => {
  let validEmail = ''
  let validPassword = ''
  let invalidCredentials = ''

  if (typeof error.message === 'object' && error.message.email) {
    validEmail = error.message.email
  }

  if (typeof error.message === 'object' && error.message.password) {
    validPassword = error.message.password
  }

  if (typeof error.message === 'string') {
    invalidCredentials = error.message
  }

  return (
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
          error={Boolean(validEmail) || Boolean(invalidCredentials)}
          helperText={validEmail || invalidCredentials}
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
          error={Boolean(validPassword) || Boolean(invalidCredentials)}
          helperText={validPassword || invalidCredentials}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => goLog(!open)} color='primary'>Cancel</Button>
        <Button onClick={login} color='primary'>Login</Button>
      </DialogActions>
    </Dialog>
  )
}

export default LogInDialog
