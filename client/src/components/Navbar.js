import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import LocalMallIcon from '@material-ui/icons/LocalMall';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import LogInDialog from './dialogs/LogInDialog';
import SignUpDialog from './dialogs/SignUpDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: theme.colors.navbarPurple,
  },
  menuButton: {
    marginRight: 12,
    [theme.breakpoints.down('xs')]: {
      marginRight: 4,
    }
  },
  title: {
    flexGrow: 1,
  },
  navbarButton: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.xsFont
    }
  },
  backToColelctionsButton: {
    paddingRight: 5,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.xsFont
    }
  }
}));

const Navbar = ({
  changeLoginStatus,
  backToCollectionsButton,
  renderCollectionList,
  changeFetchCollections,
  isLoggedIn
 }) => {
  const classes = useStyles();

  // state
  const [loginData, changeLoginData] = useState({ email: '', password: '' })
  const [signupData, changeSignupData] = useState({ email: '', username: '', password: '' })
  const [loginError, changeLoginError] = useState({ status: false, message: '' })
  const [signupError, changeSignupError] = useState({ status: false, message: { password: '', email: '', username: '' } })
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
    } else {
      changeLoginStatus(false)
      changeLoginError({ status: true, message: responseBody.error })
    }
  }

  const baloSignUp = async () => {
    const response = await fetch('/api/v1/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupData)
    })
    const responseBody = await response.json()

    if (responseBody.success) {
      changeLoginStatus(true)
      openSignupDialog(false)
    } else {
      changeSignupError({ status: true, message: responseBody.error })
    }
  }

  const baloLogOut = async () => {
    const response = await fetch('/api/v1/users/logout', { method: 'GET' })
    const responseBody = await response.json()
  
    if (responseBody.success) {
      // workaround not to show back to collections button when
      // logging out from language pairs page
      renderCollectionList(true)
      changeLoginStatus(false)
      changeLoginData({ email: null, password: null })
    }
  }

  const renderCollections = () => {
    renderCollectionList(true)
    changeFetchCollections(false)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.navbar}>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' onClick={renderCollections}>
            <LocalMallIcon />
          </IconButton>
          <Typography variant='h5' className={classes.title}>Balo</Typography>
          {
            backToCollectionsButton && (
              <Button color='inherit' onClick={renderCollections} className={classes.navbarButton}>
                <ExitToAppIcon className={classes.backToColelctionsButton} /> Back
              </Button>
            )
          }
          {
            !isLoggedIn && (
              <React.Fragment>
                <Button color='inherit' onClick={() => openLoginDialog(!loginDialog)} className={classes.navbarButton}>Login</Button>
                <Button color='inherit' onClick={() => openSignupDialog(!signupDialog)} className={classes.navbarButton}>Sign up</Button>
              </React.Fragment>
            )
          }
          { 
            isLoggedIn && <Button color='inherit' onClick={() => baloLogOut()} className={classes.navbarButton}>Logout</Button> 
          }
          <LogInDialog
            open={loginDialog}
            goLog={openLoginDialog}
            loginData={loginData}
            changeLoginData={changeLoginData}
            login={baloLogIn}
            error={loginError}
          />
          <SignUpDialog 
            open={signupDialog}
            goSign={openSignupDialog}
            signupData={signupData}
            changeSignupData={changeSignupData}
            signup={baloSignUp}
            error={signupError}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
