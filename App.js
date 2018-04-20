import React, { Component } from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import './css/App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      drawerOpened: false
    };
  }

  _toggleDrawer() {
    this.setState({
      drawerOpened: !this.state.drawerOpened
    })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <AppBar
            title="Movies Trailer"
            onLeftIconButtonClick={() => this._toggleDrawer()}
          />
          <Drawer
            open={this.state.drawerOpened}
            docked={false}
            onRequestChange={() => this._toggleDrawer()}
          >
            <List>
              <ListItem>Item 1</ListItem>
              <ListItem>Item 2</ListItem>
              <ListItem>Item 3</ListItem>
              <Divider />
              <ListItem>Item 4</ListItem>
            </List>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}
