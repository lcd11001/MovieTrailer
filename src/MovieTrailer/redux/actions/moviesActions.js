import {
    HOME_MOVIES_LOAD,
} from './actionTypes';

import * as API from '../../api'

export const loadHomeMovies = () => (
    (dispatch) => {
        dispatch(API.getMoviesHome())
        .then((json) => {
            dispatch({
                type: HOME_MOVIES_LOAD,
                payload: json
            }) 
        })
    }
)

