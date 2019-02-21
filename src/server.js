// https://material-ui.com/guides/server-rendering/
import * as express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { SheetsRegistry } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'

import {
    MuiThemeProvider,
    createGenerateClassName
} from '@material-ui/core/styles'

import theme from './theme'

import App from './LearningMaterialUI/App'


const app = express()

const port = 5000

app.use(express.static('public'))

app.use((req, res) => {
    const sheetsRegistry = new SheetsRegistry()
    const sheetsManager = new Map()
    const generateClassName = createGenerateClassName()

    const html = renderToString(
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                <App />
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
    
        <link rel='manifest' href='%PUBLIC_URL%/manifest.json'>
        <link rel='shortcut icon' href='%PUBLIC_URL%/favicon.ico'>

        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'>
        <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'>

        <link rel='stylesheet' type='text/css' charset='UTF-8' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
        <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />

        <style id='jss-styles'>${css}</style>
        
        <title>Movies Trailer</title>
    </head>
    <body>
        <div id='root'>${html}</div>
        <script src='main.js'></script>
    </body>
    </html>
    `)
})

app.listen(port, () => {
    console.log(`listenning http://localhost:${port}`)
})
