'use strict';

import { browserHistory } from 'react-router/lib';

const defaultImage = 'http://placehold.it/100x100';
const guesserState = {
  player: 'P1',
  score: 0,
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
  ],
  letters: ['t', 'e', 's', 't']
};

export default (state = guesserState, action) => {
  switch(action.type) {
    case 'SET_IMAGES':
      return Object.assign({}, state, {images: state.images});
    case 'SET_PLAYER':
      return Object.assign({}, state, {player: state.player, score: state.score});
    case 'SET_LETTERS':
      return Object.assign({}, state, {letters: state.letters});
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

