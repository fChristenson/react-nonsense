'use strict';

import { browserHistory } from 'react-router/lib';

export default (state = {}, action) => {
  switch(action.type) {
    case 'REMOTE_SCOREBOARD':
    case 'SCOREBOARD':
      browserHistory.push('/scoreboard');
      return state;
    default:
      return state;
  };
};

