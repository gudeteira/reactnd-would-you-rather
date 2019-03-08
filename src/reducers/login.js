import {LOGIN} from '../actions/login';

export default function login(state = null, action) {
  switch (action.type) {
    case LOGIN:
      return action.user;
    default:
      return state;
  }
}