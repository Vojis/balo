import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';

import EditCollectionNameDialog from './dialogs/EditCollectionNameDialog';
import DeleteDialog from './dialogs/DeleteDialog';
import colors from '../constants/colors'

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    height: 66
  },
  font: {
    color: theme.colors.darkPurple,
    fontWeight: 800,
  },
  cardActionsContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  iconButton: {
    padding: 4
  },
  icon: {
    color: theme.colors.lightPurple,
  },
  launch: {
    paddingLeft: 6,
    opacity: .1,
    fontSize: 40,
  }
}))

const Collection = ({name, colorKey, collectionId, onUpdate }) => {
  const classes = useStyles()

  // state
  const [isEditDialogOpen, openEditDialog] = useState(false)
  const [isDeleteDialogOpen, openDeleteDialog] = useState(false)

  return (
    <Card className={classes.card}>
      <CardActionArea 
        className={classes.cardHeader}
        style={{ background: `linear-gradient(90deg, ${colors[colorKey]} 0%, #b2ade3 100%)` }}
      >
        <LaunchIcon className={classes.launch} />
      </CardActionArea>
      <CardActions className={classes.cardActionsContainer}>
        <Typography className={classes.font}>
          {name}
        </Typography>
        <span>
          <Tooltip title='Edit collection name' enterDelay={500}>
            <IconButton className={classes.iconButton} aria-label='edit' onClick={() => openEditDialog(!isEditDialogOpen)}>
              <EditIcon fontSize='small' className={classes.icon} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete collection' enterDelay={500}>
            <IconButton className={classes.iconButton} aria-label='delete' onClick={() => openDeleteDialog(!isDeleteDialogOpen)}>
              <DeleteIcon fontSize='small' className={classes.icon} />
            </IconButton>
          </Tooltip>
        </span>
      </CardActions>
      
      {/* Dialogs */}
      <EditCollectionNameDialog 
        name={name}
        collectionId={collectionId}
        open={isEditDialogOpen}
        openDialog={openEditDialog}
        onUpdate={onUpdate}
      />
      <DeleteDialog
        name={name}
        collectionId={collectionId}
        open={isDeleteDialogOpen}
        openDialog={openDeleteDialog}
        onUpdate={onUpdate}
      />
    </Card>
  )
}

export default Collection
