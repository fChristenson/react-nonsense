'use strict';

const talkerState = {
  player: 'P1',
  score: 0,
  image:'http://www.placehold.it/100x100',
  letters: [],
  randomLetters: ['z', 'h', 'u', 'd', 'a', 'q', 'f', 'n', 'p', 'r', 'c', 'v']
};

export default (state = talkerState, action) => {
  switch(action.type) {
    case 'ADD_LETTER':
      const letters = state.letters.concat([action.letter]);
      return Object.assign({}, state, {letters: letters});
    default:
      return state;
  };
};

