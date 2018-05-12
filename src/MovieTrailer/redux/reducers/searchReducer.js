import {
  MOVIES_SEARCH
} from '../actions/actionTypes';

export default (state={}, action) => {
  switch (action.type) {
    case MOVIES_SEARCH:
      return action.payload;

    default:
      return state;
  }
};
