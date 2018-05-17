import {
    HOME_MOVIES_LOAD,
    MOVIE_DETAIL
} from '../actions/actionTypes'

const moviesReducer = (state = {
    Banner: [],
    Categories: [],
    MovieDetail: {}
}, action) => {
    switch (action.type) {
        case HOME_MOVIES_LOAD:
            state = {
                ...state,
                Banner: action.payload.Movies_Banners,
                Categories: action.payload.MoviesByCates
            }
            break

        case MOVIE_DETAIL:
            state = {
                ...state,
                MovieDetail: action.payload
            }

        default:
            break
    }

    return state
}

export default moviesReducer
