'use strict';

import { browserHistory } from 'react-router/lib';

export default (state = {}, action) => {
  switch(action.type) {

    case 'START_TALKING':
      browserHistory.push('/talker/' + action.code);
      return state;

    default:
      return state;
  };
};

