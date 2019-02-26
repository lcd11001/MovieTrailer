import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
import { ConnectedRouter } from 'connected-react-router'
import { store, history } from './MovieTrailer/redux/store'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import theme from './theme'

// import App from './LearningMaterialUI/App'
import App from './MovieTrailer/App'

render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
)



