'use strict';

import { browserHistory } from 'react-router/lib';

const incorrectState = {
  player: 'P1',
  score: 0
};

export default (state = incorrectState, action) => {
  switch(action.type) {
    case 'SET_PLAYER':
      return Object.assign({}, state, {player: state.player, score: state.score});
    case 'SCOREBOARD':
      browserHistory.push('/scoreboard');
      return state;
    default:
      return state;
  };
};

