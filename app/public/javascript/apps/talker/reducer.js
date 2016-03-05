'use strict';

const talkerState = {
  image:'http://www.placehold.it/100x100',
  randomLetters: ['z', 'h', 'u', 'd', 'a', 'q', 'f', 'n', 'p', 'r', 'c', 'v']
};

export default (state = talkerState, action) => {
  switch(action.type) {
    default:
      return state;
  };
};

