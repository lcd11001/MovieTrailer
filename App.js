import React from 'react';
import HomeScreen from './src/components/HomeScreen';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

export default () => (

    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <HomeScreen />
    </MuiThemeProvider>

);
