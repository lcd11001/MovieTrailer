import {
    HOME_MOVIES_LOAD,
    MOVIE_DETAIL
} from './actionTypes'

import * as API from '../../api'

export const loadHomeMovies = () => (
    (dispatch) => {
        dispatch(API.getMoviesHome())
        .then(json => {
            if (typeof(json) === 'object') 
            {
                dispatch({
                    type: HOME_MOVIES_LOAD,
                    payload: json
                })
            } 
        })
        .catch(error => {
            console.error('loadHomeMovies error', error)
        })
    }
)

export const loadMovieDetail = (movieID) => (
    (dispatch) => {
        dispatch(API.getMovieDetail(movieID))
        .then(json => {
            if (typeof(json) === 'object')
            {
                dispatch({
                    type: MOVIE_DETAIL,
                    payload: json
                })
            }
        })
        .catch(error => {
            console.error('loadMovieDetail error', error)
        })
    }
)

