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

import Drawer from '../components/Drawer'
import AppBar from '../components/AppBar'

import Home from '../containers/Home'

import { drawerStyles as styles } from '../styles'

const mailFolderListItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Starred" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Send mail" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItem>
    </div>
  )

class HomeDrawer extends Component {

    constructor(props)
    {
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
    };

    render() {
        return (
            <Fragment>
                <AppBar onMenuClicked={this._onMenuClicked}/>
                <Drawer menuItems={mailFolderListItems} open={this.state.open} onClose={this._onDrawerClose} />
                <div style={{marginTop: 30}}>
                    <Home />
                </div>
            </Fragment>
        )
    }
}

export default compose ( withStyles(styles), withWidth() ) (HomeDrawer)