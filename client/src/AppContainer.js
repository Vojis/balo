import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames'
import Navbar from './components/Navbar';
import Collections from './components/Collections';
import CollectionPairs from './components/CollectionPairs';

import userLoggedIn from './utils/userLoggedIn';

const useStyles = makeStyles(() => ({
  mainContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(90deg, #3b328f 0%, #6960c7 100%);',
  },
  baloWelcomeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 150px)',
  },
  collectionContainer: {
    padding: '24px',
  },
  baloImg: {
    height: '350px',
    opacity: 0.35,
  },
  hideElement: {
    display: 'none'
  }
}));

const AppContainer = () => {
  const classes = useStyles();

  // state
  const [isLoggedIn, changeLoginStatus] = useState(userLoggedIn())
  const [shouldShowCollections, showCollections] = useState(true)
  const [collection, changeCollection] = useState({})
  const [shouldFetchCollections, changeFetchCollections] = useState(true)

  const openCollection = (incomingCollection) => {
    showCollections(false)
    changeCollection(incomingCollection)
  }

  return (
    <div className={classes.mainContainer}>
      <Navbar 
        changeLoginStatus={changeLoginStatus} 
        backToCollectionsButton={!shouldShowCollections}
        renderCollectionList={showCollections}
        changeFetchCollections={changeFetchCollections}
        isLoggedIn={isLoggedIn}
      />
      <div className={classnames({
        [classes.baloWelcomeContainer]: true,
        [classes.hideElement]: isLoggedIn,
      })}>
        <img
          src="https://easydrawingguides.com/wp-content/uploads/2018/09/Backpack-10.png"
          alt="balo"
          className={classes.baloImg}
        />
      </div>
      <div className={classnames({
        [classes.collectionContainer]: true,
        [classes.hideElement]: !isLoggedIn
      })}>
        {
          shouldShowCollections ? 
            <Collections
              isLoggedIn={isLoggedIn}
              openCollection={openCollection}
              shouldFetchCollections={shouldFetchCollections}
            /> 
            :
            <CollectionPairs collection={collection} />
        }
      </div>
    </div>
  );
};


export default AppContainer;
