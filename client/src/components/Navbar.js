import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LogInDialog from './dialogs/LogInDialog';
import SignUpDialog from './dialogs/SignUpDialog';
import LoginStatus from '../utils/LoginContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: '#7c74cf',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ changeLoginStatus }) => {
  const classes = useStyles();
  const context = useContext(LoginStatus)
  const {isLoggedIn} = context 

  const [loginData, changeLoginData] = useState({ email: null, password: null })
  const [loginDialog, openLoginDialog] = useState(false)
  const [signupDialog, openSignupDialog] = useState(false)

  const baloLogIn = async () => {
    const response = await fetch('/api/v1/users/login', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    })
    const responseBody = await response.json()

    if (responseBody.success) {
      changeLoginStatus(true)
      openLoginDialog(false)
    }
  }

  const baloLogOut = async () => {
    const response = await fetch('/api/v1/users/logout', { method: 'GET' })
    const responseBody = await response.json()
  
    if (responseBody.success) {
      changeLoginStatus(false)
      changeLoginData({ email: null, password: null })
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <LocalMallIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>Balo</Typography>
          {
            !isLoggedIn && (
              <React.Fragment>
                <Button color="inherit" onClick={() => openLoginDialog(!loginDialog)}>Login</Button>
                <Button color="inherit" onClick={() => signupDialog(!signupDialog)}>Sign up</Button>
              </React.Fragment>
            )
          }
          { 
            isLoggedIn && <Button color="inherit" onClick={() => baloLogOut()}>Logout</Button> 
          }
          <LogInDialog
            open={loginDialog}
            goLog={openLoginDialog}
            loginData={loginData}
            changeLoginData={changeLoginData}
            login={baloLogIn}
          />
          <SignUpDialog 
            open={signupDialog}
            goSign={openSignupDialog}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
