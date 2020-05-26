import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import LoginStatus from '../utils/LoginContext'
import Collection from './Collection'

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#fff',
  },
  button: {
    background: '#fff',
    textTransform: 'none',
    marginTop: 5,
    color: theme.colors.darkPurple,
    weight: 800,
    '&:disabled': {
      backgroundColor: '#fff !important',
    },
    '&:hover': {
      backgroundColor: theme.colors.purpleish
    }
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
  input: {
    color: '#fff',
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'green !important'
  },
  label: {
    color: `${theme.colors.purpleish} !important`,
  },
  createNewCollectionContainer: {
    marginTop: 30,
  }
}))

const fetchCollections = async () => {
  const response = await fetch('/api/v1/collections')
  return await response.json()
}

const Collections = () => {
  const classes = useStyles()
  const context = useContext(LoginStatus)

  // state
  const [collections, getCollections] = useState([])
  const [newCollection, nameNewCollection] = useState('')
  const [counter, changeCounter] = useState(0)

  useEffect( () => {
    if (context.isLoggedIn) {
       (async function() {
        const responseBody = await fetchCollections()
         console.log('responseBody', responseBody.data)
        getCollections(responseBody.data || [])
      })()
    }
  }, [counter])  

  const createCollection = async () => {
    const collection = await fetch('/api/v1/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCollection })
    })

    const response = await collection.json()
    if (response.success) {
      nameNewCollection('')
      const collections = await fetchCollections()
      getCollections(collections.data || [])
    }
  }

  const onChange = (e) => {
    const { value } = e.target 
    nameNewCollection(value)
  }

  return (
    <React.Fragment>
      <Typography variant='h4' className={classes.title}>
        Collections
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
                  />
                </Grid>
              ))
            }
          </Grid>
        </div>
      }

      <div className={classes.createNewCollectionContainer}>
        <TextField
          id='collection'
          label='New collection'
          placeholder='Collection name'
          type='text'
          onChange={onChange}
          value={newCollection}
          InputProps={{
            classes: { root: classes.input },
            disableUnderline: true,
          }}
          InputLabelProps={{
            classes: { root: classes.label, focused: classes.label },
          }}
        />
      </div>
      <Button 
        disabled={!newCollection}
        variant='contained' 
        className={classes.button}
        onClick={createCollection}
        endIcon={<CloudUploadIcon />}
      >
        Create new collection
      </Button>
    </React.Fragment>
  )
}

export default Collections
