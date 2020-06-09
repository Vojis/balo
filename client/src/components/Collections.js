import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

import CloseIcon from '@material-ui/icons/Close';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import PostAddIcon from '@material-ui/icons/PostAdd';

import LoginStatus from '../utils/LoginContext';
import Collection from './Collection'
import CreateCollectionDialog from './dialogs/CreateCollectionDialog';
import collectionList from '../utils/collectionList';

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#fff',
  },
  subtitle: {
    color: '#fff',
    marginTop: 24,
  },
  whiteIcon: {
    color: '#fff',
    paddingLeft: 5,
  },
  collectionContainer: {
    marginTop: 24,
  },
  noCollectionContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  iconButton: {
    marginLeft: 10,
    padding: 15,
    backgroundColor: theme.colors.lightPurple,
    '&:hover': {
      backgroundColor: theme.colors.navbarPurple,
      opacity: 1,
    }
  },
  icon: {
    color: '#fff',
    fontWeight: 800,
    fontSize: 24,
  },
}))

const fetchCollections = async () => {
  const response = await fetch('/api/v1/collections')
  return await response.json()
}

const Collections = ({ openCollection, shouldFetchCollections }) => {
  const classes = useStyles()
  const context = useContext(LoginStatus)
  const { isLoggedIn } = context

  // state
  const [collections, getCollections] = useState(collectionList())
  const [isDialogOpen, openDialog] = useState(false)
  const [openSnackbar, changeOpenSnackbar] = useState(false)

  useEffect(() => {
    if (isLoggedIn && shouldFetchCollections) {
      (async function () {
        const responseBody = await fetchCollections()
        collectionList(responseBody.data)
        getCollections(responseBody.data || [])
      })()
    }
  }, [isLoggedIn, shouldFetchCollections])

  const updateCollectionData = async () => {
    const collections = await fetchCollections()
    if (collections.success) {
      getCollections(collections.data || [])
      collectionList(collections.data)
    } else {
      changeOpenSnackbar(true)
    }
  }

  const createCollection = async () => {
    openDialog(false)
    updateCollectionData()
  }

  return (
    <React.Fragment>
      <Typography variant='h4' className={classes.title}>
        Collections
        <IconButton className={classes.iconButton} onClick={() => {openDialog(!isDialogOpen)}}>
          <PostAddIcon className={classes.icon} />
        </IconButton>
      </Typography>
      {
        !collections.length && (
          <Typography className={classes.noCollectionContainer}>
            <span className={classes.subtitle}>You have no collections. Create your first one!</span>
            <FiberNewIcon className={classes.whiteIcon} />
          </Typography>
        )
      }
      {
        <div className={classes.collectionContainer}>
          <Grid container spacing={4}>
            {
              collections.map(collection => (
                <Grid item lg={3} sm={6} xs={12} key={collection._id}>
                  <Collection
                    name={collection.name}
                    colorKey={collection.colorKey}
                    collectionId={collection._id}
                    onUpdate={updateCollectionData}
                    onDelete={updateCollectionData}
                    openCollection={() => openCollection(collection)}
                  />
                </Grid>
              ))
            }
          </Grid>
        </div>
      }

      <CreateCollectionDialog 
        open={isDialogOpen}
        openDialog={openDialog}
        sendCollectionData={createCollection}
      />

      <Snackbar
        severity='error'
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => changeOpenSnackbar(false)}
        message='Something went wrong'
        action={
          <IconButton size='small' aria-label='close' color='inherit' onClick={() => changeOpenSnackbar(false)}>
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      />
    </React.Fragment>
  )
}

export default Collections
