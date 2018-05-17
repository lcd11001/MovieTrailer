import {
    HOME_MOVIES_LOAD,
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

