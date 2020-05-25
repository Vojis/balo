import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const colors = [
  '#584ec2',
  '#6a61c8',
  '#7c74cf',
  '#8e87d6',
  '#8794d6',
  '#a287d6'
]

const getRandomNumber = () => {
  return Math.floor(Math.random() * Math.floor(6))
}

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    height: 33
  },
  cardContent: {
    padding: 8
  },
  font: {
    color: '#3b328f',
    fontWeight: 800,
  }
}))

const Collection = ({name, colorKey}) => {

  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardHeader 
          className={classes.cardHeader} 
          style={{ background: `linear-gradient(90deg, ${colors[colorKey]} 0%, #b2ade3 100%)`}}
          />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.font}> 
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Collection
