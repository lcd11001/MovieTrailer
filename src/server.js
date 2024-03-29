// https://material-ui.com/guides/server-rendering/
import * as express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { SheetsRegistry } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import reload from 'reload'

import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName'

import theme from './theme'

// import App from './LearningMaterialUI/App'
import App from './MovieTrailer/App'
import createStore from './MovieTrailer/redux/store'

const app = express()

const port = 5000
const IS_DEV = process.env.NODE_ENV === 'development'
const BUILD_CLIENT_DIR = process.env.BUILD_CLIENT_DIR

app.use(express.static(BUILD_CLIENT_DIR))
app.use(express.static(BUILD_CLIENT_DIR + '/public'))

// MUST here
if (IS_DEV) {
    reload(app)
}

app.use((req, res) => {
    const { store } = createStore(req.url)
    const context = {}

    const sheetsRegistry = new SheetsRegistry()
    const sheetsManager = new Map()
    const generateClassName = createGenerateClassName()

    const html = renderToString(
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <App />
                    </StaticRouter>
                </Provider>
            </MuiThemeProvider>
        </JssProvider>
    )

    const css = sheetsRegistry.toString()

    res.send(`
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
        <meta name='theme-color' content='#000000'>
    
        <link rel='shortcut icon' href='favicon.ico'>

        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'>
        <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'>

        <link rel='stylesheet' type='text/css' charset='UTF-8' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
        <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />

        <style id='jss-styles'>${css}</style>
        
        <title>Movies Trailer</title>
    </head>
    <body>
        <div id='root'>${html}</div>
        <script type='text/javascript' src='main.js' async></script>
        ${IS_DEV ? `<script type='text/javascript' src='reload/reload.js' async></script>` : ''}
    </body>
    </html>
    `)
})

app.listen(port, () => {
    console.log(`listenning http://localhost:${port}`)
})

