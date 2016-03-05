'use strict';

import { browserHistory } from 'react-router/lib';

const defaultImage = 'http://placehold.it/100x100';
const guesserState = {
  images: [
  {
    src: defaultImage,
    isValid: false
  },
  {
    src: defaultImage,
    isValid: true
  },
  {
    src: defaultImage,
    isValid: false
  }
  ]
};

export default (state = guesserState, action) => {
  switch(action.type) {
    case 'SET_IMAGES':
      return Object.assign({}, state, {images: state.images});
    case 'CORRECT_CHOICE':
      browserHistory.push('/correct');
      return state;
    case 'INCORRECT_CHOICE':
      browserHistory.push('/incorrect');
      return state;
    default:
      return state;
  };
};

