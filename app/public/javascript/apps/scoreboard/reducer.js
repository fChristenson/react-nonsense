'use strict';

import { browserHistory } from 'react-router/lib';

export default (state = {}, action) => {
  switch(action.type) {

    case 'END_GAME':
      browserHistory.push('/');
      return state;

    default:
      return state;
  };
};

