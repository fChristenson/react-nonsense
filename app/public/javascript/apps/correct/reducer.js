'use strict';

import { browserHistory } from 'react-router/lib';

const correctState = {
  player: 'P1',
  score: 0
};

export default (state = correctState, action) => {
  switch(action.type) {
    case 'SCOREBOARD':
      browserHistory.push('/scoreboard');
      return state;
    default: 
      return state;
  };
};

