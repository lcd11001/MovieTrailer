import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// import App from './App'
// import App from './LearningMaterialUI/App'


import store from './MovieTrailer/redux/store'
import App from './MovieTrailer/App'

// ReactDOM.render(<App />, document.getElementById('root'))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
