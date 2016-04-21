'use strict';

import { browserHistory } from 'react-router/lib';
import U                  from '../../../../util';

const talkerState = {
  randomLetters: U.randomLetters().slice(0, 12)
};

export default (state = talkerState, action) => {
  switch(action.type) {
    case 'TALKER_NEXT_ROUND':
      const randomLetters = U.randomLetters().slice(0, 12);
      browserHistory.push('/talker/' + action.code);
      return Object.assign({}, state, {randomLetters});
    default:
      return state;
  };
};

