import {
    FETCH_BEGIN, FETCH_END_SUCCESS, FETCH_END_FAILURE,
} from '../actions/actionTypes'

const fetchReducer = (state = {
    Loading: false,
    Error: null
}, action) => {
    switch (action.type) {
        case FETCH_BEGIN:
            state = {
                ...state,
                Loading: true
            }
            break

        case FETCH_END_SUCCESS:
            state = {
                ...state,
                Loading: false
            }
            break

        case FETCH_END_FAILURE:
            state = {
                ...state,
                Loading: false,
                Error: action.payload.error
            }
            break

        default:
            break
    }

    return state
}

export default fetchReducer
