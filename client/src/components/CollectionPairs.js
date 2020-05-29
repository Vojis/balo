import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PeopleIcon from '@material-ui/icons/People';
import PairDialog from './dialogs/PairDialog';

const useStyles = makeStyles((theme) => ({
  collectionName: {
    color: '#fff',
  },
  icon: {
    color: '#fff',
    fontWeight: 800,
    fontSize: 24,
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
  noPairsContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  whiteIcon: {
    color: '#fff',
    paddingLeft: 5,
  },
  subtitle: {
    color: '#fff',
    marginTop: 16,
  },
}))

const fetchPairs = async (id) => {
  const response = await fetch(`/api/v1/collections/${id}/pairs`)
  return await response.json()
}

const CollectionPairs = (props) => {
  const { collection } = props 
  const classes = useStyles()

  // state
  const [pairs, getPairs] = useState([])
  const [isDialogOpen, openDialog] = useState(false)
  const [pairData, getPairData] = useState({ language1: '', language2: '' })

  useEffect(() => {
    (async function() {
      const incomingPairs = await fetchPairs(collection._id)
      getPairs(incomingPairs.data)
    })()
  })

  const savePairs = async () => {
    const { language1, language2 } = pairData
    const response = await fetch(`/api/v1/collections/${collection._id}/pairs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language1, language2 })
    })
    
    const pairs = await response.json()
    if (pairs.success) {
      openDialog(false)
      getPairData({ language1: '', language2: '' })
    }
  }

  return (
    <React.Fragment>
      <Typography variant='h4' className={classes.collectionName}>
        {collection.name}
        <IconButton className={classes.iconButton} onClick={() => openDialog(true)}>
          <PostAddIcon className={classes.icon} />
        </IconButton>
      </Typography>
      {
        !pairs.length && (
          <Typography className={classes.noPairsContainer}>
            <span className={classes.subtitle}>You have no pairs. Connect them!</span>
            <PeopleIcon className={classes.whiteIcon} />
          </Typography>
        )
      }
      {
        Boolean(pairs.length) && (
          pairs.map(pair => (
            <div>
              <span>{pair.language1}</span>
              <span>{pair.language2}</span>
            </div>
          ))
        )
      }

      <PairDialog 
        open={isDialogOpen}
        shouldDialogBeOpen={openDialog}
        pairData={pairData}
        getPairData={getPairData}
        onSavePairs={savePairs}
      />
    </React.Fragment>
  )

}

export default CollectionPairs
