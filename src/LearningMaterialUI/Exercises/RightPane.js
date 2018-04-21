import React from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

export default ({ 
  styles, 
  exercise: {
    id,
    title = 'Welcome!',
    description = 'Plase select an exercise from the list on the left'
  } 
}) => (
  <Paper style={styles.paper}>
    <Typography variant='display1'>
      {title}
    </Typography>
    <Typography variant='subheading' style={{marginTop: 20}}>
      {description}
    </Typography>
  </Paper>
)
