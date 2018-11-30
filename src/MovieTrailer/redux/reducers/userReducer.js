import {
    USER_LOGIN,
    USER_LOGGED
} from '../actions/actionTypes'

const defaultState = {
    name: 'LCD',
    isLogged: false
}

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case USER_LOGGED:
            return { ...state, isLogged: action.isLogged }

        default:
            return state
    }
}

export default userReducer
