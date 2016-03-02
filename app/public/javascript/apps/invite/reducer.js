'use strict';

import { browserHistory } from 'react-router/lib';

const inviteState = {
  inviteCode: '1337'
};

export default (state = inviteState, action) => {
  switch(action.type) {
    case 'SET_INVITE_CODE':
      return Object.assign({}, state, {inviteCode: action.inviteCode});
    case 'START_GAME':
      browserHistory.push('/guesser');
      return state;
    default:
      return state;
  };
};

