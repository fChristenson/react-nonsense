'use strict';

import R from 'ramda';

const sortPlayers = (p1, p2) => {
    const p1Num = parseInt(p1 && p1.name ? p1.name.substring(1) : 0);
    const p2Num = parseInt(p2 && p2.name ? p2.name.substring(1) : 0);
    return p1Num - p2Num;
};

module.exports.sortPlayers = sortPlayers;

//_->String []
const randomLetters = () => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return shuffle(letters);
};

module.exports.randomLetters = randomLetters;

//_->String
const randomHexColor = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16);

module.exports.randomHexColor = randomHexColor;

// []->[]
const shuffle = array => {
    const result = R.clone(array);
    let i;
    let j;
    let tmp;
    for (i = result.length; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        tmp           = result[i - 1]; 
        result[i - 1] = result[j];
        result[j]     = tmp;
    }
    return result;
};

module.exports.shuffle = shuffle;

// Image []->Image []
const shuffleImages = array => {
    const clone       = R.clone(array);
    const resetArray  = clone.map(image => {
        image.isValid   = false;
        return image;
    }); 
    const result      = shuffle(resetArray);
    result[0].isValid = true;
    return result;
};

module.exports.shuffleImages = shuffleImages;

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
const isPlayer = R.curry((player, obj) => player.id === obj.id);

module.exports.isPlayer = isPlayer;
