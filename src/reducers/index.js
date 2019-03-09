import {combineReducers} from 'redux';
import loaded from './loaded';
import login from './login';
import questions from './questions';
import users from './users';

export default combineReducers({
  login,
  users,
  questions,
  loaded
});