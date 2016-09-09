'use strict';

import { browserHistory } from 'react-router/lib';

export default (state = {}, action) => {
  switch(action.type) {

    case 'INVITE_TO_GAME':
          browserHistory.push('/invite');
          return state;

    case 'JOIN_GAME':
          browserHistory.push('/join');
          return state;

    default:
          return state;
  };
};

