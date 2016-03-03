'use strict';

const resultState = {
  selectedImage: 'http://www.placehold.it/100x100'
};

export default (state = resultState, action) => {
  switch(action.type) {
    default:
      return state;
  };
};

