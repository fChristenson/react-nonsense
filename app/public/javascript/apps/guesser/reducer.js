'use strict';

import { browserHistory } from 'react-router/lib';

export default (state = {}, action) => {
  switch(action.type) {
    case 'CORRECT_CHOICE':
      browserHistory.push('/correct/' + action.code);
      return state;
    case 'INCORRECT_CHOICE':
      browserHistory.push('/incorrect/' + action.code);
      return state;
    default:
      return state;
  };
};

