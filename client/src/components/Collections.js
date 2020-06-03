import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import IconButton from '@material-ui/core/IconButton';
import PostAddIcon from '@material-ui/icons/PostAdd';

import LoginStatus from '../utils/LoginContext';
import Collection from './Collection'
import CreateCollectionDialog from './dialogs/CreateCollectionDialog';

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#fff',
  },
  subtitle: {
    color: '#fff',
    marginTop: 16,
  },
  whiteIcon: {
    color: '#fff',
    paddingLeft: 5,
  },
  collectionContainer: {
    marginTop: 16,
  },
  noCollectionContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'green !important'
  },
  label: {
    color: `${theme.colors.purpleish} !important`,
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

const Collections = ({ openCollection }) => {
  const classes = useStyles()

  const context = useContext(LoginStatus)
  const { isLoggedIn } = context

  // state
  const [collections, getCollections] = useState([])
  const [counter, changeCounter] = useState(0)
  const [isDialogOpen, openDialog] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      (async function () {
        const responseBody = await fetchCollections()
        getCollections(responseBody.data || [])
      })()
    }
  }, [counter, isLoggedIn])

  const sendCollectionData = (collection) => {
    return collection
  }

  const createCollection = async () => {
    sendCollectionData()
    openDialog(false)
    const collections = await fetchCollections()
    getCollections(collections.data || [])
  }

  return (
    <React.Fragment>
      <Typography variant='h4' className={classes.title}>
        Collections
        <IconButton className={classes.iconButton} onClick={() => { openDialog(!isDialogOpen) }}>
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
                    onUpdate={() => changeCounter(counter + 1)}
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
    </React.Fragment>
  )
}

export default Collections
