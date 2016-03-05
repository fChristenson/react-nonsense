'use strict';

import { browserHistory } from 'react-router/lib';

export default (state = {}, action) => {
  switch(action.type) {
    case 'START_GAME':
      browserHistory.push('/guesser');
      return state;
    default:
      return state;
  };
};

