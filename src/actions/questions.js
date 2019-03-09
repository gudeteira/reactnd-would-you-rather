import {answer} from '../utils/api';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export function getQuestions(questions, user) {
  return {
    type: GET_QUESTIONS,
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

export function handleAnswerQuestion(data) {
  return dispatch => {
    dispatch(answerQuestion(data));
    answer({'authedUser': data.user, 'qid': data.id, 'answer': data.answer});
  };
}