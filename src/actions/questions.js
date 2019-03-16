import {answer, saveQuestion} from '../utils/api';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_MY_QUESTIONS = 'GET_MY_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';

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

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function handleAnswerQuestion(data) {
  return dispatch => {
    answer({'authedUser': data.user, 'qid': data.id, 'answer': data.answer})
      .then(dispatch(answerQuestion(data)));
  };
}

export function handleAddQuestion(data) {
  return (dispatch, getState) => {
    const {login} = getState();
    return saveQuestion({author: login, ...data})
      .then(question => dispatch(addQuestion(question)));

  };
}