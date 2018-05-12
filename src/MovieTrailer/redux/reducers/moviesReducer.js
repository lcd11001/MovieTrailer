import {
    FETCH_BEGIN, FETCH_END_SUCCESS, FETCH_END_FAILURE,
    HOME_MOVIES_LOAD
} from '../actions/actionTypes'

const moviesReducer = (state = {
    Banner: [],
    Categories: [],
    Loading: false,
    Error: null
}, action) => {
    switch (action.type) {
        case FETCH_BEGIN:
            state = {
                ...state,
                Loading: true
            }
            break

        case FETCH_END_SUCCESS:
            state = {
                ...state,
                Loading: false
            }
            break

        case FETCH_END_FAILURE:
            state = {
                ...state,
                Loading: false,
                Error: action.payload.error
            }
            break

        case HOME_MOVIES_LOAD:
            state = {
                ...state,
                Banner: action.payload.Banner,
                Categories: action.payload.Categories
            }
            break

        default:
            break
    }

    return state
}

export default moviesReducer
