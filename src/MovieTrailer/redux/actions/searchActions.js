import {
    MOVIES_SEARCH
} from './actionTypes';


export const searchMovies = (searchTerm) => ({
    type: MOVIES_SEARCH,
    payload: searchTerm
});
