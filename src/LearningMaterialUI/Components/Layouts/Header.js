import React from 'react'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

// https://material.io/icons/
export default props => (
  <AppBar position='static'>
    <Toolbar>
      <Typography variant='headline' color='inherit' align='center'>
        Exercies Database
      </Typography>
    </Toolbar>
  </AppBar>
)
