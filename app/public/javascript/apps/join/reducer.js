'use strict';

import { browserHistory } from 'react-router/lib';

export default (state = {}, action) => {
  switch(action.type) {
    case 'SET_INVITE_CODE':
      return Object.assign({}, state, {inviteCode: action.inviteCode});
    case 'LOBBY':
      browserHistory.push('/lobby');
      return state;
    default:
      return state;
  };
};

