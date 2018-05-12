import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import moviesReducer from './reducers/moviesReducer'
import searchReducer from './reducers/searchReducer'

export default createStore(
    combineReducers({
        movies: moviesReducer,
        search: searchReducer
    }),
    {},
    applyMiddleware(createLogger(), thunk, promise())
)
