'use strict';

import { browserHistory } from 'react-router/lib';

const scoreboardState = {
  scores: [
    {
      player: 'P1',
      points: 0,
    },
    {
      player: 'P2',
      points: 0
    },
    {
      player: 'P3',
      points: 0
    }
  ]
};

export default (state = scoreboardState, action) => {
  switch(action.type) {
    case 'SET_SCORES':
      return Object.assign({}, state, {scores: state.scores});
    case 'END_GAME':
      browserHistory.push('/');
      return state;
    default:
      return state;
  };
};

