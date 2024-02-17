import React, { Component, Fragment } from 'react'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import withStyles from '@material-ui/core/styles/withStyles'

import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import StarIcon from '@material-ui/icons/Star'
import SendIcon from '@material-ui/icons/Send'
import DeleteIcon from '@material-ui/icons/Delete'
import ReportIcon from '@material-ui/icons/Report'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import InfoIcon from '@material-ui/icons/AccountCircle';

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
    {
        CategoryID: '07',
        CategoryName: 'About Me',
        Subcate: 0,
        Icon: (<InfoIcon />),
        ExpandIcon: (<ExpandMore />),
        CollapseIcon: (<ExpandLess />),
        IsExpanded: false,
        Children: [
            {
                CategoryID: '08',
                CategoryName: 'Lương Công Dân',
                Subcate: 0
            },
            {
                CategoryID: '09',
                CategoryName: 'lcd11001@gmail.com',
                Subcate: 0
            },
            {
                CategoryID: '10',
                CategoryName: '(+84) 902.711.388',
                Subcate: 0
            },
            {
                CategoryID: '11',
                CategoryName: '2024-02-17',
                Subcate: 0
            },
        ]
    },
]

class HomeDrawer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            refreshMenu: false
        }
    }

    _onMenuClicked = (event) => {
        this.setState({
            open: !this.state.open
        })
    }

    _onDrawerClose = (e, open) => {
        console.log('_onDrawerClose', e.target)
        if (e.target.id && e.target.id === 'backdrop')
        {
            this.setState({
                open
            });
        }
    }

    _onMenuItemClicked = (e, item) => {
        console.log('_onMenuItemClicked', e.target)
        if (item.Children)
        {
            // console.log('_onMenuItemClicked ' + item.CategoryName + ' => ' + item.IsExpanded)
            item.IsExpanded = !item.IsExpanded
            this.setState((prevState, props) => ({
                refreshMenu: true
            }))
        }
        else
        {
            // console.log('_onMenuItemClicked ' + item.CategoryName)
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