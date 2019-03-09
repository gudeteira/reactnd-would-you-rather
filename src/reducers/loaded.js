import {LOADED} from '../actions/loaded';

export default function loaded(state = {}, action) {
  switch (action.type) {
    case LOADED:
      return action.loaded;
    default:
      return state;
  }
}