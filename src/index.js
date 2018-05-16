import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// import App from './App'
// import App from './LearningMaterialUI/App'

// ReactDOM.render(<App />, document.getElementById('root'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
import { ConnectedRouter } from 'react-router-redux'
import { store, history } from './MovieTrailer/redux/store'
import App from './MovieTrailer/App'

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)
