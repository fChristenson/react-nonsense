'use strict';

import { browserHistory } from 'react-router/lib';

export default (state = {}, action) => {
  switch(action.type) {
    case 'GUESSER_NEXT_ROUND':
      browserHistory.push('/guesser/' + action.code);
      return state;
    case 'REMOTE_SCOREBOARD':
    case 'SCOREBOARD':
      browserHistory.push('/scoreboard/' + action.code);
      return state;
    default: 
      return state;
  };
};

