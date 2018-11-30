import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// import App from './App'
// import App from './LearningMaterialUI/App'

// ReactDOM.render(<App />, document.getElementById('root'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
import { ConnectedRouter } from 'react-router-redux'
import { store, history } from './MovieTrailer/redux/store'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './MovieTrailer/App'

// https://material-ui.com/customization/default-theme/
const theme = createMuiTheme({
    palette: {
        background: {
            default: '#f2f2f2', // body background-color
        }
    }
})

const RenderApp = () => (
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>,
    </MuiThemeProvider>
)

ReactDOM.render(
    <RenderApp />,
    document.getElementById('root')
)
