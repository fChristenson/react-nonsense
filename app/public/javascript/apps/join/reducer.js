'use strict';

import { browserHistory } from 'react-router/lib';

export default (state = {}, action) => {
  switch(action.type) {

    case 'SET_INPUT_CODE':
      return Object.assign({}, state, {code: action.code});

    case 'LOBBY':
      browserHistory.push('/lobby/' + action.code);
      return state;

    default:
      return state;
  };
};

