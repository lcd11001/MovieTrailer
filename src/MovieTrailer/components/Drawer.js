import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

import { drawerStyles as styles } from '../styles'

const TemporaryDrawer = (props) => {
    
    const { classes, menuItems, open, onClose } = props

    const item = (item) => (
        <ListItem button key={item.CategoryID}>
            <ListItemIcon>{item.Icon}</ListItemIcon>
            <ListItemText inset primary={item.CategoryName} />
            {item.IsExpanded ? item.CollapseIcon : item.ExpandIcon}
        </ListItem>
    )

    const subitem = (item) => (
        <ListItem button style={{paddingLeft: 50}} key={item.CategoryID}>
            <ListItemIcon>{item.Icon}</ListItemIcon>
            <ListItemText inset primary={item.CategoryName} />
        </ListItem>
    )

    const sideList = (menuItems) => {
        return (
            <div className={classes.list}>
                <List>
                    {
                        menuItems.map((value, index) => {
                            if (value.Children)
                            {
                                return (
                                    <Fragment>
                                        {
                                            item(value)
                                        }
                                        <Collapse in={value.IsExpanded} timeout='auto' unmountOnExit>
                                            <List>
                                            {
                                                value.Children.map((child, i) => (
                                                    subitem(child)
                                                ))
                                            }
                                            </List>
                                        </Collapse>
                                    </Fragment>
                                )
                            }
                            else
                            {
                                return item(value)
                            }                            
                        })
                    }
                </List>
            </div>
        )
            
    }

    return (
        <div>
            <Drawer anchor="left" open={open} onClose={onClose(false)} classes={{paper: classes.drawerPaper}}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={onClose(false)}
                    onKeyDown={onClose(false)}
                >
                    {
                        sideList(menuItems)
                    }
                </div>
            </Drawer>
        </div>
    )

}

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    menuItems: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default compose ( withStyles(styles), withWidth() ) (TemporaryDrawer)
