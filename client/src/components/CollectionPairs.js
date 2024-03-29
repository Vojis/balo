import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CreatePairDialog from './dialogs/CreatePairDialog';
import EditPairDialog from './dialogs/EditPairDialog';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';

import PostAddIcon from '@material-ui/icons/PostAdd';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

import pairList from '../utils/pairList';

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#fff',
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
    },
  },
  buttonMargin: {
    marginRight: 10,
  },
  icon: {
    color: '#fff',
    fontWeight: 800,
    fontSize: 24,
  },
  iconButton: {
    padding: 15,
    backgroundColor: theme.colors.lightPurple,
    '&:hover': {
      backgroundColor: theme.colors.navbarPurple,
      opacity: 1,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 11,
    },
  },
  noPairsContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  subtitle: {
    color: '#fff',
    opacity: .33,
    marginTop: 24,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  expansionPanelContainer: {
    marginTop: 24,
  },
  panelTranslation: {
    background: `linear-gradient(90deg, #d6d3f0 0%, #e8e6f6 100%)`,
    paddingTop: 16,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pairIcon: {
    color: theme.colors.navbarPurple,
    fontSize: 18,
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'scale(1.4)',
    }
  },
  noShowButton: {
    display: 'none'
  },
  actionButtons: {
    textAlign: 'right', 
    minWidth: 102,
  }
}))

const fetchPairs = async (id) => {
  const response = await fetch(`/api/v1/collections/${id}/pairs`)
  return await response.json()
}

const CollectionPairs = (props) => {
  const { collection } = props 
  const collectionId = collection._id
  const classes = useStyles()

  // state
  const [pairs, getPairs] = useState([])
  const [pairData, getPairData] = useState({ language1: '', language2: '', pairId: '', languageCollection: '' })
  const [isDialogOpen, openDialog] = useState(false)
  const [isEditDialogOpen, openEditDialog] = useState(false)
  const [expand, changeExpand] = useState({})
  const [expandAll, changeExpandAll] = useState(false)
  const [switchLanguage, changeSwitchLanguage] = useState(false)
  const [openSnackbar, changeOpenSnackbar] = useState(false)

  useEffect(() => {
    if (pairList[collectionId]) {
      getPairs(pairList[collectionId])
    } else {
      (async function () {
        const incomingPairs = await fetchPairs(collectionId)
        pairList[collectionId] = incomingPairs.data
        getPairs(incomingPairs.data)
      })()
    }
  }, [collectionId])

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

  const updatePairData = async () => {
    const incomingPairs = await fetchPairs(collectionId)
    pairList[collectionId] = incomingPairs.data
    getPairs(incomingPairs.data)
  }

  const startEditMode = async (pair) => {
    const { language1, language2, _id, languageCollection } = pair
    getPairData({ language1, language2, languageCollection, pairId: _id, })
    openEditDialog(true)
  }

  const savePairs = async () => {
    const { language1, language2 } = pairData
    const response = await fetch(`/api/v1/collections/${collection._id}/pairs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language1, language2 })
    })
    
    const pairs = await response.json()
    openDialog(false)
    
    if (pairs.success) {
      getPairData({ language1: '', language2: '' })
      updatePairData()
    } else {
      changeOpenSnackbar(true)
    }
  }

  const deletePair = async (pair) => {
    const { languageCollection, _id } = pair
    const response = await fetch(`/api/v1/collections/${languageCollection}/pairs/${_id}`, {
      method: 'DELETE',
    })
    
    const deletedPair = await response.json()
    if (deletedPair.success) {
      updatePairData()

      if (pairs.length === 1) {
        changeExpandAll(false)
        changeExpand({})
      }
    } else {
      changeOpenSnackbar(true)
    }
  }

  const updatePairs = async () => {
    const { language1, language2, languageCollection, pairId } = pairData
    const response = await fetch(`/api/v1/collections/${languageCollection}/pairs/${pairId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language1, language2 })
    })
    const updatedPairs = await response.json()
    openEditDialog(false)

    if (updatedPairs.success) {
      getPairData({ language1: '', language2: '', pairId: '', languageCollection: '' })
      updatePairData()
    } else {
      changeOpenSnackbar(true)
    }
  }

  return (
    <React.Fragment>
      <div className={classes.buttonContainer}>
        <Typography variant='h4' className={classes.title}>
          <span className={classes.buttonMargin}>{collection.name}</span>
          <IconButton className={classes.iconButton} onClick={() => openDialog(true)}>
            <PostAddIcon className={classes.icon} />
          </IconButton>
        </Typography>
        <span className={classes.actionButtons} >
          <IconButton 
            onClick={() => changeSwitchLanguage(!switchLanguage)}
            className={classnames({
              [classes.iconButton]: true,
              [classes.buttonMargin]: true,
              [classes.noShowButton]: !pairs.length
            })}
          >
            <FlipCameraAndroidIcon className={classes.icon} />
          </IconButton>
          <IconButton
            onClick={onExpandAll} 
            className={classnames({
              [classes.iconButton]: true,
              [classes.noShowButton]: !pairs.length
            })}
          >
            {
              expandAll ? <UnfoldLessIcon className={classes.icon} /> : <UnfoldMoreIcon className={classes.icon} />
            }
          </IconButton>
        </span>
      </div>
      {
        !pairs.length && (
          <Typography className={classes.noPairsContainer}>
            <span className={classes.subtitle}>You have no pairs. Connect them!</span>
          </Typography>
        )
      }
      {
        Boolean(pairs.length) && (
          pairs.map(pair => (
            <div className={classes.expansionPanelContainer} key={pair._id}>
              <ExpansionPanel expanded={expand[pair._id] || false}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={() => expandSingle(pair)}>
                  <Typography className={classes.heading}>{switchLanguage ? pair.language2 : pair.language1}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.panelTranslation}>
                  <Typography>{switchLanguage ? pair.language1 : pair.language2}</Typography>
                  <span>
                    <Tooltip title='Delete pair' enterDelay={500}>
                      <IconButton aria-label='delete' onClick={() => { deletePair(pair) }}>
                        <DeleteIcon fontSize='small' className={classes.pairIcon} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Edit pair' enterDelay={500}>
                      <IconButton aria-label='edit' onClick={() => { startEditMode(pair) }}>
                        <EditIcon fontSize='small' className={classes.pairIcon} />
                      </IconButton>
                    </Tooltip>
                  </span>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          ))
        )
      }

      <CreatePairDialog 
        open={isDialogOpen}
        shouldDialogBeOpen={openDialog}
        pairData={pairData}
        getPairData={getPairData}
        onSavePairs={savePairs}
      />
      <EditPairDialog 
        open={isEditDialogOpen}
        shouldEditDialogBeOpen={openEditDialog}
        pairData={pairData}
        getPairData={getPairData}
        onSavePairs={updatePairs}
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

export default CollectionPairs
