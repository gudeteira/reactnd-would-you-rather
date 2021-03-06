import {loadingBarReducer} from 'react-redux-loading';
import {combineReducers} from 'redux';
import {LOGOUT} from '../actions/login';
import error from './error';
import login from './login';
import questions from './questions';
import users from './users';

const appReducer = combineReducers({
  login,
  users,
  questions,
  error,
  loadingBar: loadingBarReducer
});

export default (state, action) => {
  if (action.type === LOGOUT) {
    state.login = undefined;
  }
  return appReducer(state, action);
};