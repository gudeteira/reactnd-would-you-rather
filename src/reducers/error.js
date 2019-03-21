import {CLEAR_ERROR, ERROR} from '../actions/error';

export default function error(state = {}, action) {
  switch (action.type) {
    case ERROR:
      return action.error;
    case CLEAR_ERROR:
      return {};
    default:
      return state;
  }
}