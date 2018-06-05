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
    console.log('TemporaryDrawer', props)

    const { classes, menuItems, open, onClose, onMenuItemClicked, width } = props

    const item = (item, onClick) => (
        <ListItem button key={item.CategoryID} onClick={(e) => onClick(e, item)}>
            <ListItemIcon>{item.Icon}</ListItemIcon>
            <ListItemText inset primary={item.CategoryName} />
            {item.IsExpanded ? item.CollapseIcon : item.ExpandIcon}
        </ListItem>
    )

    const subitem = (item, onClick) => (
        <ListItem button style={{paddingLeft: 50}} key={item.CategoryID} onClick={(e) => onClick(e, item)}>
            <ListItemIcon>{item.Icon}</ListItemIcon>
            <ListItemText inset primary={item.CategoryName} />
        </ListItem>
    )

    const sideList = (menuItems, onClick) => {
        return (
            <div className={classes.list}>
                <List>
                    {
                        menuItems.map((value, index) => {
                            if (value.Children)
                            {
                                return (
                                    <Fragment key={value.CategoryID}>
                                        {
                                            item(value, onClick)
                                        }
                                        <Collapse in={value.IsExpanded} timeout='auto' unmountOnExit>
                                            <List>
                                            {
                                                value.Children.map((child, i) => (
                                                    subitem(child, onClick)
                                                ))
                                            }
                                            </List>
                                        </Collapse>
                                    </Fragment>
                                )
                            }
                            else
                            {
                                return item(value, onClick)
                            }                            
                        })
                    }
                </List>
            </div>
        )
            
    }

    const calcPaddingTop = (width, value, variant) => {
        switch (width) {
            // extra small
            case 'xs': 
                return `${value - 4 * variant}`
            
            // small
            case 'sm': 
                return `${value - 3 * variant}`
            
            // medium
            case 'md': 
                return `${value - 2 * variant}`
            
            // large
            case 'lg': 
                return `${value - variant}`
            
            default:
                break
        }

        return value
    }

    return (
        <div>
            <Drawer id='drawer' anchor="left" open={open} onClose={(e) => onClose(e, false)} 
                classes={{
                    paper: classes.drawerPaper, 
                    modal: classes.drawerModal,
                }}
                ModalProps={{
                    BackdropProps: {
                        style: {
                            // 'background-color': "yellow", 
                            // opacity: 0.4,
                            top: `${calcPaddingTop(width, 80, 10)}px`
                        },
                        id: 'backdrop'
                    }
                }}
            >
                <div
                    id='drawer_list_panel'
                    tabIndex={0}
                    role="button"
                    onClick={(e) => onClose(e, false)}
                    onKeyDown={(e) => onClose(e, false)}
                >
                    {
                        sideList(menuItems, onMenuItemClicked)
                    }
                </div>
            </Drawer>
        </div>
    )

}

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    menuItems: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onMenuItemClicked: PropTypes.func.isRequired
}

export default compose ( withStyles(styles, {withTheme: true}), withWidth() ) (TemporaryDrawer)
