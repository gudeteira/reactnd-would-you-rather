import {combineReducers} from 'redux';
import {LOGOUT} from '../actions/login';
import loaded from './loaded';
import login from './login';
import questions from './questions';
import users from './users';

const appReducer = combineReducers({
  login,
  users,
  questions,
  loaded
});

export default (state, action) => {
  if (action.type === LOGOUT) {
    state.login = undefined;
  }
  return appReducer(state, action);
};