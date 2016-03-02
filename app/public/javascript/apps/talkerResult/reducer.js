'use strict';

const resultState = {
  player: 'P1',
  score: 0,
  image:{src: 'http://www.placehold.it/100x100'},
  selectedImage: {src: 'http://www.placehold.it/100x100'}
};

export default (state = resultState, action) => {
  switch(action.type) {
    default:
      return state;
  };
};

