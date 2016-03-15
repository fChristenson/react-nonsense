'use strict';

import { browserHistory } from 'react-router/lib';

export default (state = {}, action) => {
  switch(action.type) {
    case 'CORRECT_CHOICE':
      browserHistory.push('/correct');
      return state;
    case 'INCORRECT_CHOICE':
      browserHistory.push('/incorrect');
      return state;
    default:
      return state;
  };
};

