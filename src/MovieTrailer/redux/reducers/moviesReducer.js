import {
    HOME_MOVIES_LOAD,
    MOVIE_DETAIL,
    MOVIE_PLAY,
    CLEAR_MOVIE_DETAIL
} from '../actions/actionTypes'

const moviesReducer = (state = {
    Banner: [],
    Categories: [],
    MovieDetail: null,
    MoviePlay: null
}, action) => {
    switch (action.type) {
        case HOME_MOVIES_LOAD:
            state = {
                ...state,
                
                // HDViet format
                //Banner: action.payload.Movies_Banners,
                //Categories: action.payload.MoviesByCates

                // TMDB format
                Categories: action.payload.genres
            }
            break

        case MOVIE_DETAIL:
            state = {
                ...state,
                MovieDetail: action.payload
            }
            break

        case MOVIE_PLAY:
            state = {
                ...state,
                MoviePlay: action.payload
            }
            break

        case CLEAR_MOVIE_DETAIL:
            state = {
                ...state,
                MovieDetail: action.payload
            }
            break;

        default:
            break
    }

    return state
}

export default moviesReducer
