import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
import { ConnectedRouter } from 'connected-react-router'
import { store, history } from './MovieTrailer/redux/store'
import { MuiThemeProvider } from '@material-ui/core/styles'

import theme from './theme'

// import App from './LearningMaterialUI/App'
// import App from './MovieTrailer/App'

// @babel split chunk
// import(/* webpackChunkName: 'app' */ './LearningMaterialUI/App')
import(/* webpackChunkName: 'app' */ './MovieTrailer/App')
    .then(({ default: App }) =>
        ReactDOM.render(
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <App />
                    </ConnectedRouter>
                </Provider>
            </MuiThemeProvider>,
            document.getElementById('root')
        )
    )


