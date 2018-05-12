import { FETCH_BEGIN, FETCH_END_SUCCESS, FETCH_END_FAILURE } from './actionTypes'

export const fetchBegin = () => ({
    type: FETCH_BEGIN
});

export const fetchSuccess = () => ({
    type: FETCH_END_SUCCESS
});

export const fetchError = (error) => ({
    type: FETCH_END_FAILURE,
    payload: error
});