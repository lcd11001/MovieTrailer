import {
    FETCH_BEGIN, FETCH_END_SUCCESS, FETCH_END_FAILURE,
} from '../actions/actionTypes'

const defaultState = {
    Loading: false,
    Count: 0,
    Error: null
}

const fetchReducer = (state = defaultState, action) => {
    let currentCount = state.Count
    let nextCount = Math.max(0, currentCount - 1)

    switch (action.type) {
        case FETCH_BEGIN:
            state = {
                ...state,
                Loading: true,
                Count: currentCount + 1
            }
            break

        case FETCH_END_SUCCESS:
            state = {
                ...state,
                Count: nextCount,
                Loading: nextCount === 0 ? false : true
            }
            break

        case FETCH_END_FAILURE:
            state = {
                ...state,
                Count: nextCount,
                Loading: nextCount === 0 ? false : true,
                Error: action.payload.error
            }
            break

        default:
            break
    }

    return state
}

export default fetchReducer
