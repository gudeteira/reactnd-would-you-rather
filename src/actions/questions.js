import {hideLoading, showLoading} from 'react-redux-loading';
import {answer, saveQuestion} from '../utils/api';
import {error} from './error';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_MY_QUESTIONS = 'GET_MY_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const REMOVE_ANSWER = 'REMOVE_ANSWER';

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions
  };
}

export function getMyQuestions(questions, user) {
  return {
    type: GET_MY_QUESTIONS,
    questions,
    user
  };
}

export function answerQuestion({user, id, answer}) {
  return {
    type: ANSWER_QUESTION,
    id,
    user,
    answer
  };
}

export function removeAnswer({user, id, answer}) {
  return {
    type: REMOVE_ANSWER,
    id,
    user,
    answer
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function removeQuestion(question) {
  return {
    type: REMOVE_QUESTION,
    question
  };
}

export function handleAnswerQuestion(data) {
  return dispatch => {
    dispatch(answerQuestion(data));
    answer({'authedUser': data.user, 'qid': data.id, 'answer': data.answer})
      .catch(e => {
        console.warn('Error in handleAnswerQuestion: ', e);
        const errorData = parseError(e);
        if (errorData) {
          dispatch(error({action: ANSWER_QUESTION, ...errorData, data}));
        }
      });
  };
}

function parseError(e) {
  let errorData;
  try {
    errorData = JSON.parse(e);
  } catch (exception) {
    console.error('Error parsing error response: ', exception);
  }
  return errorData;
}

export function handleAddQuestion(data) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const {login} = getState();
    return saveQuestion({author: login, ...data})
      .then(question => {
        dispatch(addQuestion(question));
        dispatch(hideLoading());
      })
      .catch(e => {
        console.warn('Error in handleAddQuestion: ', e);
        const errorData = parseError(e);
        if (errorData) {
          dispatch(error({action: ADD_QUESTION, ...errorData}));
          dispatch(addQuestion(errorData.question));

        }
      });

  };
}