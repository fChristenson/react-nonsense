'use strict';

import { browserHistory } from 'react-router/lib';

const resultState = {
  selectedImage: 'http://www.placehold.it/100x100'
};

export default (state = resultState, action) => {
  switch(action.type) {
    case 'GUESS_WAS_MADE':
      browserHistory.push('/talker/result');
      return Object.assign({}, state, {selectedImage: action.selectedImage});
    default:
      return state;
  };
};

