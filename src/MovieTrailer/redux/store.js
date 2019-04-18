import {
    createStore,
    applyMiddleware,
    combineReducers,
    compose
} from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import { createBrowserHistory, createMemoryHistory } from 'history'
import { connectRouter } from 'connected-react-router'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import * as reducers from './reducers'

/**
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
    composeWithDevTools(
        applyMiddleware(
            thunk,
            promise,
            routerMiddleware(history)
        )
    )
)
*/

export default (url = '/') => {
    // Create a history depending on the environment
    const history = __isBrowser__
        ? createBrowserHistory()
        : createMemoryHistory({
            initialEntries: [url]
        })

    const enhancers = []

    // Dev tools are helpful
    if (process.env.NODE_ENV === 'development' && __isBrowser__) {
        const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension())
        }
    }

    const middleware = [thunk, promise, routerMiddleware(history)]
    const composeEnhancers = compose(
        applyMiddleware(...middleware),
        ...enhancers
    )

    // Do we have preloaded state available? Great, save it.
    const initalState = __isBrowser__ ? window.__PRELOAD_STATE__ : {}

    // Delete it once we have it stored in a variable
    if (__isBrowser__) {
        delete window.__PRELOAD_STATE__
    }

    const rootReducer = combineReducers({
        fetch: reducers.fetchReducer,
        movies: reducers.moviesReducer,
        search: reducers.searchReducer,
        user: reducers.userReducer,
        router: connectRouter(history),
    })

    // create the store
    const store = createStore(
        rootReducer,
        initalState,
        composeEnhancers
    )

    return {
        store,
        history
    }
}
