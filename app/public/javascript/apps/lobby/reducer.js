'use strict';

import { browserHistory } from 'react-router/lib';

const lobbyState = {
  player: 'P1'
};

export default (state = lobbyState, action) => {
  switch(action.type) {
    case 'START_TALKING':
      browserHistory.push('/talker');
      return state;
    default:
      return state;
  };
};

