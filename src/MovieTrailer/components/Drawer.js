import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'

import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { drawerStyles as styles } from '../styles'

class PersistentDrawer extends React.Component {
    state = {
        open: false,
        anchor: 'left',
    }

    handleDrawerOpen = () => {
        this.setState({ open: true })
    }

    handleDrawerClose = () => {
        this.setState({ open: false })
    }

    render() {
        const { classes, theme, menuItems, children } = this.props
        const { anchor, open } = this.state

        const drawer = (
            <Drawer
                variant="persistent"
                anchor={anchor}
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        {anchor === 'right' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>{menuItems}</List>
            </Drawer>
        )

        let before = null
        let after = null

        if (anchor === 'left') {
            before = drawer
        } else {
            after = drawer
        }

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                            [classes[`appBarShift-${anchor}`]]: open,
                        })}
                    >
                        <Toolbar disableGutters={!open}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" noWrap>
                                Persistent drawer
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {before}
                    <main
                        className={classNames(classes.content, classes[`content-${anchor}`], {
                            [classes.contentShift]: open,
                            [classes[`contentShift-${anchor}`]]: open,
                        })}
                    >
                        <div className={classes.drawerHeader} />
                        <Typography>{'You think water moves fast? You should see ice.'}</Typography>
                        <div>
                            {children}
                        </div>
                    </main>
                    {after}
                </div>
            </div>
        )
    }
}

PersistentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    menuItems: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
}

export default withStyles(styles, { withTheme: true })(PersistentDrawer)
