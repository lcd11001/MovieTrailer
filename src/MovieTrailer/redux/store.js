import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import { createBrowserHistory } from 'history'
import { connectRouter } from 'connected-react-router'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import * as reducers from './reducers'

export const history = createBrowserHistory()

export const store = createStore(
    combineReducers({
        fetch: reducers.fetchReducer,
        movies: reducers.moviesReducer,
        search: reducers.searchReducer,
        user: reducers.userReducer,
        router: connectRouter(history),
    }),
    {},
    applyMiddleware(
        createLogger(), 
        thunk, 
        promise(),
        routerMiddleware(history)
    )
)
