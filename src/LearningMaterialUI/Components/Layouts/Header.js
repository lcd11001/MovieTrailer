import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import CreateDialog from '../../Exercises/Dialogs/Create'

const headerStyle = {
  flex: 1
}

// https://material.io/icons/
export default props => (
  <AppBar position='static'>
    <Toolbar>
      <Typography variant='headline' color='inherit' align='center' style={headerStyle}>
        Exercies Database
      </Typography>

      <CreateDialog />
    </Toolbar>
  </AppBar>
)
