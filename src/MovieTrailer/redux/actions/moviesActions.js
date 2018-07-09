import {
    HOME_MOVIES_LOAD,
    MOVIE_DETAIL,
    MOVIE_PLAY,
    CLEAR_MOVIE_DETAIL
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

export const playMovie = (movieID, sequence) => (
    (dispatch) => {
        dispatch(API.getMoviePlay(movieID, sequence))
        .then(json => {
            if (typeof(json) === 'object')
            {
                dispatch({
                    type: MOVIE_PLAY,
                    payload: json
                })
            }
        })
        .catch(error => {
            console.error('playMovie error', error)
        })
    }
)

export const clearMovieDetail = () => (
    {   
        type: CLEAR_MOVIE_DETAIL,
        payload: null
    }
)

