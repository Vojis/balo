import React, { useState, useContext } from 'react';
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
import LoginStatus from '../utils/LoginContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: theme.colors.navbarPurple,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({
  changeLoginStatus,
  backToCollectionsButton,
  renderCollectionList,
  changeFetchCollections,
 }) => {
  const classes = useStyles();
  const context = useContext(LoginStatus)
  const { isLoggedIn } = context 

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
          <Typography variant='h6' className={classes.title}>Balo</Typography>
          {
            backToCollectionsButton && (
              <Button color='inherit' onClick={renderCollections}>
                <ExitToAppIcon style={{paddingRight: 5}} /> Collections
              </Button>
            )
          }
          {
            !isLoggedIn && (
              <React.Fragment>
                <Button color='inherit' onClick={() => openLoginDialog(!loginDialog)}>Login</Button>
                <Button color='inherit' onClick={() => openSignupDialog(!signupDialog)}>Sign up</Button>
              </React.Fragment>
            )
          }
          { 
            isLoggedIn && <Button color='inherit' onClick={() => baloLogOut()}>Logout</Button> 
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
