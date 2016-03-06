'use strict';

import R from 'ramda';
//_->String
const randomHexColor = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16)
module.exports.randomHexColor = randomHexColor;
// []->[]
const shuffle = array => {
  const result = R.clone(array);
  let i;
  let j;
  let tmp;
  for (i = array.length; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    tmp          = array[i - 1]; 
    array[i - 1] = array[j];
    array[j]     = tmp;
  }
  return result;
};
module.exports.shuffle = shuffle;
// Number->Guesser {}->Guesser {}
const addGuesserPoints = R.curry((points, guesser) => {
  const newScore = R.add(guesser.score, points);
  const clone    = R.clone(guesser);
  clone.score    = newScore;
  return clone;
});
module.exports.addGuesserPoints = addGuesserPoints;
// Letter []->Talker {}->Number
const getNumLetters = R.curry((letters, talker) => {
  return letters.reduce((acc, next) => {
    acc += (next.player.id === talker.id) ? 1 : 0;
    return acc;
  }, 0);
});
module.exports.getNumLetters = getNumLetters;
// Number->Talker []->Letter []->Talker []
const addTalkerPoints = R.curry((points, talkers, letters) => {
  return talkers 
    .map(talker => {
      const numLetters = getNumLetters(letters, talker);
      talker.score += (numLetters * points);
      return talker;
    }); 
});
module.exports.addTalkerPoints = addTalkerPoints;
// Player {}->{}->Boolean
const isPlayer = R.curry((player, obj) => player.id === obj.id)
module.exports.isPlayer = isPlayer;
