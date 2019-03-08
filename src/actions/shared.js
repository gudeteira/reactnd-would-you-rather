import {getUsers} from './users';
import {getQuestions} from './questions';
import {login} from './login';
import {getData} from '../utils/api'

const CURRENT_USER = 'johndoe';

export function handleLoadData() {
  return dispatch => {
    dispatch(login(CURRENT_USER));
    return getData().then(({questions, users}) => {
        dispatch(getUsers(users));
        dispatch(getQuestions(questions, users[CURRENT_USER]));
      }
    );
  }
}