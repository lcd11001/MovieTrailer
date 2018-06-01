import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import StarIcon from '@material-ui/icons/Star'
import SendIcon from '@material-ui/icons/Send'
import MailIcon from '@material-ui/icons/Mail'
import DeleteIcon from '@material-ui/icons/Delete'
import ReportIcon from '@material-ui/icons/Report'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import Drawer from '../components/Drawer'
import AppBar from '../components/AppBar'

import Home from '../containers/Home'

import { drawerStyles as styles } from '../styles'

const mailFolderListItems = [
    {
        CategoryID: '01',
        CategoryName: 'Sent mail',
        Subcate: 0,
        Icon: (<SendIcon />)
    },
    {
        CategoryID: '02',
        CategoryName: 'Drafts',
        Subcate: 0,
        Icon: (<DraftsIcon />)
    },
    {
        CategoryID: '03',
        CategoryName: 'Inbox',
        Subcate: 0,
        Icon: (<InboxIcon />),
        ExpandIcon: (<ExpandMore />),
        CollapseIcon: (<ExpandLess />),
        IsExpanded: false,
        Children: [
            {
                CategoryID: '04',
                CategoryName: 'Starred',
                Subcate: 0,
                Icon: (<StarIcon />)
            },
        ]
    },
    {
        CategoryID: '05',
        CategoryName: 'Report',
        Subcate: 0,
        Icon: (<ReportIcon />),
        ExpandIcon: (<ExpandMore />),
        CollapseIcon: (<ExpandLess />),
        IsExpanded: false,
        Children: [
            {
                CategoryID: '06',
                CategoryName: 'Delete',
                Subcate: 0,
                Icon: (<DeleteIcon />)
            },
        ]
    },
]

class HomeDrawer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    _onMenuClicked = (event) => {
        this.setState({
            open: !this.state.open
        })
    }

    _onDrawerClose = (open) => () => {
        this.setState({
            open
        });
    }

    _onMenuItemClicked = (item) => {
        if (item.Children)
        {
            console.log('_onMenuItemClicked ' + item.CategoryName + ' => ' + item.IsExpanded)
            item.IsExpanded = !item.IsExpanded
        }
        else
        {
            console.log('_onMenuItemClicked ' + item.CategoryName)
        }
    }

    render() {
        const { classes } = this.props

        return (
            <Fragment>
                <AppBar onMenuClicked={this._onMenuClicked} title='Movie Trailers' />
                <Drawer menuItems={mailFolderListItems} open={this.state.open} onClose={this._onDrawerClose} onMenuItemClicked={this._onMenuItemClicked} />
                <div className={classes.child}>
                    <Home />
                </div>
            </Fragment>
        )
    }
}

export default compose(withStyles(styles), withWidth())(HomeDrawer)