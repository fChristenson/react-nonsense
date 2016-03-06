'use strict';

import { browserHistory } from 'react-router/lib';

const guesserState = {
  images: [
  {
    src: '/images/dog.jpeg',
    isValid: false
  },
  {
    src: '/images/hamburger.jpeg',
    isValid: true
  },
  {
    src: '/images/horse.jpeg',
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

