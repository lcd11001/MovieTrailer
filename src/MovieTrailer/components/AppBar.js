import React from 'react'
import PropTypes from 'prop-types'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import withStyles from '@material-ui/core/styles/withStyles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import { appbarStyles as styles } from '../styles'

function ButtonAppBar(props) {
    const { classes, onMenuClicked, title } = props
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={onMenuClicked}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.flex}>
                        {title}
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    onMenuClicked: PropTypes.func,
    title: PropTypes.string
}

export default compose ( withStyles(styles), withWidth() ) (ButtonAppBar)
