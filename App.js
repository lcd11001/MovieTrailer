import React, { Component } from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { blue500, pink500 } from 'material-ui/styles/colors';

import './css/App.css';

// https://github.com/mui-org/material-ui/blob/master/src/styles/baseThemes/lightBaseTheme.js
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    accent1Color: pink500
  }
});

const contentStyle = {
  padding: '20px'
};

const textFieldStyle = {
  display: 'block',
  width: '100%'
};

const buttonStyle = {
  marginTop: '20px'
}

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

  _sendForm(event) {
    event.preventDefault();
    var data = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    console.log('_sendForm data ', data);
  }

  render() {
    return (
      // <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <MuiThemeProvider muiTheme={muiTheme}>
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

          <div style={contentStyle}>
            <form
              onSubmit={(event) => this._sendForm(event)}
            >
              <TextField id='email' style={textFieldStyle} floatingLabelText='Email' type='email' />
              <TextField id='password' style={textFieldStyle} floatingLabelText='Password' type='password' />
              <RaisedButton style={buttonStyle} fullWidth={true} label='Login' secondary={true} type='submit' />
            </form>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
