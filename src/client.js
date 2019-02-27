import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import JssProvider from 'react-jss/lib/JssProvider'

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
import { ConnectedRouter } from 'connected-react-router'
import { store, history } from './MovieTrailer/redux/store'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName'

import theme from './theme'

import App from './LearningMaterialUI/App'
// import App from './MovieTrailer/App'

const generateClassName = createGenerateClassName()

hydrate(
    <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </Provider>
        </MuiThemeProvider>
    </JssProvider>,
    document.getElementById('root'),
    () => {
        document.getElementById('jss-styles').remove()
    }
)



