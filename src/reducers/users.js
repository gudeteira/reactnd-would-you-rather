import {ADD_USER, GET_USERS} from '../actions/users';
import {ADD_QUESTION, ANSWER_QUESTION, REMOVE_ANSWER, REMOVE_QUESTION} from '../actions/questions';

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users
      };
    case ADD_USER:
      return {
        ...state,
        [action.user.username]: {
          ...action.user
        }
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          answers: {
            ...state[action.user].answers,
            [action.id]: action.answer
          }
        }
      };
    case REMOVE_ANSWER:
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          answers: Object.keys(state[action.user].answers).reduce((result, a) => {
              if (a !== action.id) {
                result[a] = state[a];
              }
              return result;
            }, {})
        }
      };
    case  ADD_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat([action.question.id])
        }
      };
    case  REMOVE_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.filter(q => q !== action.question.id)
        }
      };
    default:
      return state;
  }

}