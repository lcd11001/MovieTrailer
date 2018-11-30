import {
    USER_LOGGED,
    USER_LOGIN
} from './actionTypes'


export const userLogin = (info) => ({
    type: USER_LOGIN,
    payload: info
})
