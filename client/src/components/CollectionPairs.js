import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  collectionName: {
    color: '#fff',
  }
}))

const CollectionPairs = (props) => {
  const { collection } = props 
  const classes = useStyles()

  return (
    <React.Fragment>
      <Typography variant='h4' className={classes.collectionName}>
        {collection.name}
      </Typography>
    </React.Fragment>
  )

}

export default CollectionPairs
