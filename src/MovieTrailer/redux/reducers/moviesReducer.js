import {
    HOME_MOVIES_LOAD
} from '../actions/actionTypes'

const moviesReducer = (state = {
    Banner: [],
    Categories: []
}, action) => {
    switch (action.type) {
        case HOME_MOVIES_LOAD:
            state = {
                ...state,
                Banner: action.payload.Movies_Banners,
                Categories: action.payload.MoviesByCates
            }
            break

        default:
            break
    }

    return state
}

export default moviesReducer
