import {
    HOME_MOVIES_LOAD,
} from './actionTypes';

import { getMoviesHome } from '../../api'

export const loadHomeMovies = () => (
    (dispatch) => {
        getMoviesHome()
        .then(json => {
            dispatch({
                type: HOME_MOVIES_LOAD,
                payload: json
            })
        })
    }
)

