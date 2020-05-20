import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './components/Navbar';

const useStyles = makeStyles(() => ({
  mainContainer: {
    height: '100vh',
    background: 'linear-gradient(90deg, #3b328f 0%, #6960c7 100%);',
  },
  balo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100% - 150px)',
  },
  baloImg: {
    height: '350px',
    opacity: 0.35,
  },
}));

const AppContainer = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.mainContainer}>
        <Navbar />
        <div className={classes.balo}>
          <img
            src="https://easydrawingguides.com/wp-content/uploads/2018/09/Backpack-10.png"
            alt="balo"
            className={classes.baloImg}
          />
        </div>
      </div>
    </React.Fragment>
  );
};


export default AppContainer;
