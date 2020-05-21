import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LogInDialog from './LogInDialog';
import SignUpDialog from './SignUpDialog';

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

const Navbar = () => {
  const classes = useStyles();

  const [login, goLog] = useState(false)
  const [signup, goSign] = useState(false)
  const [loginData, changeLoginData] = useState({ email: null, password: null})
  const [isLoggedIn, changeLoginStatus] = useState(false)

  const baloLogIn = async () => {
    const response = await fetch('/api/v1/users/login', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    })
    const responseBody = await response.json()

    if (responseBody.success) {
      changeLoginStatus(true)
      goLog(false)
    }
  }

  const baloLogOut = async () => {
    const response = await fetch('/api/v1/users/logout', {
      method: 'GET',
    })
    const responseBody = await response.json()
  
    if (responseBody.success) {
      changeLoginData({ email: null, password: null })
      changeLoginStatus(false)
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
                <Button color="inherit" onClick={() => goLog(!login)}>Login</Button>
                <Button color="inherit" onClick={() => goSign(!signup)}>Sign up</Button>
              </React.Fragment>
            )
          }
          {
            isLoggedIn && (
              <React.Fragment>
                <Button color="inherit" onClick={() => baloLogOut()}>Logout</Button>
              </React.Fragment>
            )
          }
          <LogInDialog
            open={login}
            goLog={goLog}
            loginData={loginData}
            changeLoginData={changeLoginData}
            login={baloLogIn}
          />
          <SignUpDialog 
            open={signup}
            goSign={goSign}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
