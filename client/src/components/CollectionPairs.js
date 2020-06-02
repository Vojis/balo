import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PeopleIcon from '@material-ui/icons/People';
import PairDialog from './dialogs/PairDialog';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';

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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
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
  const [expand, changeExpand] = useState({})
  const [expandAll, changeExpandAll] = useState(false)

  useEffect(() => {
    (async function() {
      const incomingPairs = await fetchPairs(collection._id)
      getPairs(incomingPairs.data)
    })()
  })

  const onExpandAll = () => {
    let shouldExpand = false
    const expandKeys = Object.keys(expand)
    const valuesArray = expandKeys.map(key => expand[key])
    
    if (!valuesArray.length || valuesArray.indexOf(false) > -1) {
      shouldExpand = true
    }

    const allIdsTrue = pairs.reduce((acc, item) => {
      acc[item._id] = shouldExpand
      return acc
    }, {})

    changeExpand(allIdsTrue)
    changeExpandAll(shouldExpand)
  }

  const expandSingle = ({_id: id}) => {
    let expandClickedItem = false

    if (!expand[id]) {
      expandClickedItem = true
    }

    const newState = { ...expand, [id]: expandClickedItem }
    const expandKeys = Object.keys(newState)
    const valuesArray = expandKeys.map(key => newState[key])

    changeExpand(newState)
    if (valuesArray.indexOf(false) === -1 && valuesArray.length === pairs.length) {
      changeExpandAll(true)
    } else {
      changeExpandAll(false)
    }
  }

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
      <div className={classes.buttonContainer}>
        <Typography variant='h4' className={classes.collectionName}>
          {collection.name}
          <IconButton className={classes.iconButton} onClick={() => openDialog(true)}>
            <PostAddIcon className={classes.icon} />
          </IconButton>
        </Typography>
        <IconButton className={classes.iconButton} onClick={onExpandAll}>
          {
            expandAll ? <UnfoldLessIcon className={classes.icon} /> : <UnfoldMoreIcon className={classes.icon} /> 
          }
        </IconButton>
      </div>
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
            <div style={{ marginTop: 16 }} key={pair._id}>
              <ExpansionPanel expanded={expand[pair._id] || false} onClick={() => expandSingle(pair)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>{pair.language2}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>{pair.language1}</Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
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
