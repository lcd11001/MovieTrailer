import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import HomeScreen from './src/components/HomeScreen';
import createStore from './src/createStore';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

const store = createStore();

export default () => (

    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <HomeScreen />
    </MuiThemeProvider>

);
