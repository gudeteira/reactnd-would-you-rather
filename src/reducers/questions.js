import {
  ADD_QUESTION,
  ANSWER_QUESTION,
  GET_MY_QUESTIONS,
  GET_QUESTIONS,
  REMOVE_ANSWER,
  REMOVE_QUESTION
} from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case GET_MY_QUESTIONS:
      const {questions, user} = action;
      const qs = Object.keys(questions).map(id =>
        Object.assign({}, questions[id], {isAnswered: user.answers[id] !== undefined})
      ).reduce((questions, question) => {
        questions[question.id] = question;
        return questions;
      }, {});

      return {
        ...state,
        ...qs
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.answer]: {
            ...state[action.id][action.answer],
            votes: state[action.id][action.answer].votes.concat([action.user])
          },
          isAnswered: true
        }
      };
    case REMOVE_ANSWER:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.answer]: {
            ...state[action.id][action.answer],
            votes: state[action.id][action.answer].votes.filter(u => u !== action.user)
          },
          isAnswered: false
        }
      };
    case  ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: {
          ...action.question,
          isAnswered: false
        }
      };
    case  REMOVE_QUESTION:
      return {
        ...Object.keys(state).reduce((result, q) => {
          if (q !== action.question.id) {
            result[q] = state[q];
          }
          return result;
        }, {})
      };
    default:
      return state;
  }
}