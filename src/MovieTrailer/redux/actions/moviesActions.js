import {
    HOME_MOVIES_LOAD,
    MOVIE_DETAIL,
    MOVIE_PLAY,
    CLEAR_MOVIE_DETAIL
} from './actionTypes'

import { fetchError } from './fetchActions'

import * as API from '../../api'

export const loadHomeMovies = () => (
    (dispatch) => {
        dispatch(API.getMoviesHome())
            .then(json => {
                if (typeof (json) === 'object') {
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

export const loadMovieDetail = (movieID, mediaType = 'movie') => (
    (dispatch) => {
        if (movieID === undefined || movieID === '') {
            dispatch(fetchError('loadMovieDetail error when movieID is invalid'))
            return
        }
        dispatch(API.getMovieDetail(movieID, mediaType))
            .then(json => {
                if (typeof (json) === 'object') {
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
        if (movieID === undefined || movieID === '') {
            dispatch(fetchError('playMovie error when movieID is invalid'))
            return
        }

        dispatch(API.getMoviePlay(movieID, sequence))
            .then(json => {
                if (typeof (json) === 'object') {
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

