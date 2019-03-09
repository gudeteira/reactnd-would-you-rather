import {GET_USERS} from '../actions/users';
import {ANSWER_QUESTION} from '../actions/questions';

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users
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
    default:
      return state;
  }

}