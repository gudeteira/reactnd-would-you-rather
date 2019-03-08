import {GET_QUESTIONS} from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      const {questions, user} = action;
      const qs = Object.keys(questions).map(id =>
        Object.assign({}, questions[id], {answered: user.answers[id] !== undefined})
      );
      return {
        ...state,
        ...qs
      };
    default:
      return state;
  }
}