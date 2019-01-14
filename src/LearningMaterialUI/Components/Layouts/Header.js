import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CreateDialog from '../../Exercises/Dialog'

const headerStyle = {
    flex: 1
}

// https://material.io/icons/
export default ({ onExerciseCreate }) => (
    <AppBar position='static'>
        <Toolbar>
            <Typography variant='h5' color='inherit' align='center' style={headerStyle}>
                Exercies Database
            </Typography>

            <CreateDialog />
        </Toolbar>
    </AppBar>
)
