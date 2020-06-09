import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SignUpDialog = ({ open, goSign, signupData, changeSignupData, signup, error }) => {
  let validEmail = ''
  let emailExists = ''
  let passwordLengthError = ''
  
  if (error.message === 'Please add a valid email') {
    validEmail = error.message
  }

  if (error.message === 'This value already exists') {
    emailExists = 'This email already exists'
  }

  if (typeof error.message === 'string' && error.message.indexOf('Path') > -1) {
    passwordLengthError = 'Password should have at least 6 characters'
  }

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle id='form-dialog-title'>Balo Sign Up</DialogTitle>
      <DialogContent>
        <TextField
          id='name'
          label='Username'
          placeholder='Username'
          type='text'
          fullWidth
          margin='normal'
          required
          defaultValue={signupData.username}
          onBlur={e => changeSignupData({ ...signupData, username: e.target.value })}
          error={Boolean(error.message.username)}
          helperText={error.message.username}
        />
        <TextField
          id='email'
          label='Email address'
          placeholder='Your email address'
          type='email'
          fullWidth
          required
          defaultValue={signupData.email}
          onBlur={e => changeSignupData({ ...signupData, email: e.target.value })}
          error={Boolean(error.message.email) || Boolean(validEmail) || Boolean(emailExists)}
          helperText={error.message.email || validEmail || emailExists}
        />
        <TextField
          id='password'
          label='Password'
          placeholder='Your password'
          type='password'
          fullWidth
          margin='normal'
          required
          defaultValue={signupData.password}
          onBlur={e => changeSignupData({ ...signupData, password: e.target.value })}
          error={Boolean(error.message.password) || Boolean(passwordLengthError)}
          helperText={error.message.password || passwordLengthError}

        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => goSign(!open)} color='primary'>
          Cancel
      </Button>
        <Button onClick={signup} color='primary'>
          Sign Up
      </Button>
      </DialogActions>
    </Dialog>
  )
} 

export default SignUpDialog
