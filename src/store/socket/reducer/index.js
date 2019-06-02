import { CONNECTION_CHANGED } from '../actions';

const INITIAL_STATE = {
  connected: false,
  port: '3000'
};

function socketReducer(state = INITIAL_STATE, { type, port, connected }) {
  let reduced;
  switch (type) {
    case CONNECTION_CHANGED:
      reduced = Object.assign({}, state, {
        connected: connected,
        isError: false
      });
      break;
    default:
      reduced = state;
  }
  return reduced;
}

export default socketReducer;