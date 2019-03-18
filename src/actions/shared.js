import {hideLoading, showLoading} from 'react-redux-loading';
import {getData} from '../utils/api';
import {load} from './loaded.js';
import {getQuestions} from './questions';
import {getUsers} from './users';

export function handleLoadData() {
  return dispatch => {
    dispatch(showLoading());
    return getData().then(({questions, users}) => {
        dispatch(getUsers(users));
        dispatch(getQuestions(questions));
        dispatch(load());
        dispatch(hideLoading());
      }
    );
  };
}