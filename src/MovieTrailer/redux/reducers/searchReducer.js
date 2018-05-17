import {
  MOVIES_SEARCH
} from '../actions/actionTypes'

const searchReducer = (state={}, action) => {
  switch (action.type) {
    case MOVIES_SEARCH:
      return action.payload

    default:
      return state
  }
}

export default searchReducer
