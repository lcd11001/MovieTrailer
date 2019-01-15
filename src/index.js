import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
import { ConnectedRouter } from 'connected-react-router'
import { store, history } from './MovieTrailer/redux/store'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// import App from './LearningMaterialUI/App'
import App from './MovieTrailer/App'

// https://material-ui.com/customization/default-theme/
const theme = createMuiTheme({
    palette: {
        background: {
            default: '#f2f2f2', // body background-color
        }
    },
    typography: {
        useNextVariants: true,
    }
})

const RenderApp = () => (
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    </MuiThemeProvider>
)

ReactDOM.render(
    <RenderApp />,
    document.getElementById('root')
)
