import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import * as reducers from './reducers'

export const history = createHistory()

export const store = createStore(
    combineReducers({
        fetch: reducers.fetchReducer,
        movies: reducers.moviesReducer,
        search: reducers.searchReducer,
        user: reducers.userReducer,
        router: routerReducer,
    }),
    {},
    applyMiddleware(
        createLogger(), 
        thunk, 
        promise(),
        routerMiddleware(history)
    )
)
