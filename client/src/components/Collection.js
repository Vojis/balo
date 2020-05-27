import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

import EditCollecitonNameDialog from './EditCollectionNameDialog';
import colors from '../constants/colors'

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    height: 33
  },
  font: {
    color: '#3b328f',
    fontWeight: 800,
  },
  cardActionsContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

const Collection = ({name, colorKey, collectionId, onUpdate }) => {
  const classes = useStyles()

  // state
  const [isDialogOpen, openDialog] = useState(false)

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardHeader 
          className={classes.cardHeader} 
          style={{ background: `linear-gradient(90deg, ${colors[colorKey]} 0%, #b2ade3 100%)`}}
        />
      </CardActionArea>
      <CardActions className={classes.cardActionsContainer}>
        <Typography className={classes.font}>
          {name}
        </Typography>
        <Tooltip title='Edit collection name' enterDelay={500}>
          <IconButton aria-label='edit' onClick={() => openDialog(!isDialogOpen)}>
            <EditIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </CardActions>
      <EditCollecitonNameDialog 
        name={name}
        collectionId={collectionId}
        open={isDialogOpen}
        openDialog={openDialog}
        onUpdate={onUpdate}
      />
    </Card>
  )
}

export default Collection
