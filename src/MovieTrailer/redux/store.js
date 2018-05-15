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

import fetchReducer from './reducers/fetchReducer'
import moviesReducer from './reducers/moviesReducer'
import searchReducer from './reducers/searchReducer'

export const history = createHistory()

export const store = createStore(
    combineReducers({
        fetch: fetchReducer,
        movies: moviesReducer,
        search: searchReducer,
        router: routerReducer
    }),
    {},
    applyMiddleware(
        createLogger(), 
        thunk, 
        promise(),
        routerMiddleware(history)
    )
)
