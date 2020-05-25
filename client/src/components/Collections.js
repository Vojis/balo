import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FiberNewIcon from '@material-ui/icons/FiberNew';

import LoginStatus from '../utils/LoginContext'
import Collection from './Collection'

const useStyles = makeStyles(() => ({
  title: {
    color: '#fff',
  },
  button: {
    background: '#fff',
    textTransform: 'none',
    margin: '20px 0'
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
  }
}))

const fetchCollections = async () => {
  const response = await fetch('/api/v1/collections')
  return await response.json()
}

const Collections = () => {
  const classes = useStyles()
  const context = useContext(LoginStatus)

  // State
  const [collections, getCollections] = useState([])
  const [newCollection, nameNewCollection] = useState('')

  useEffect( () => {
    if (context.isLoggedIn) {
       (async function fetchCollections (){
        const response = await fetch('/api/v1/collections')
        const responseBody = await response.json()
        getCollections(responseBody.data || [])
      })()
    }
  }, [context.isLoggedIn])  

  const createCollection = async () => {
    const collection = await fetch('/api/v1/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name: newCollection})
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
                <Grid item md={3} xs={2} key={collection._id}>
                  <Collection
                    name={collection.name}
                    colorKey={collection.colorKey}
                  />
                </Grid>
              ))
            }
          </Grid>
        </div>
      }

      <div style={{ marginTop: 10 }}>
        <TextField
          id="collection"
          label="Collection"
          placeholder="Collection name"
          type="text"
          onChange={onChange}
          value={newCollection}
        />
      </div>
      <Button 
        disabled={!newCollection}
        variant='contained' 
        className={classes.button}
        onClick={createCollection}
      >
        Create new collection
      </Button>
    </React.Fragment>
  )
}

export default Collections
