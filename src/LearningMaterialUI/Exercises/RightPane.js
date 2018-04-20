import React from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

export default ({ styles }) => (
  <Paper style={styles.paper}>
    <Typography variant='display1'>
      Welcome!
    </Typography>
    <Typography variant='subheading' style={{marginTop: 20}}>
      Plase select an exercise from the list on the left
    </Typography>
  </Paper>
)
