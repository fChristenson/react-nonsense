'use strict';

import { combineReducers }               from 'redux';
import startscreen                       from '../apps/startscreen/reducer.js';
import invite                            from '../apps/invite/reducer.js';
import guesser                           from '../apps/guesser/reducer.js';
import incorrect                         from '../apps/incorrect/reducer.js';
import correct                           from '../apps/correct/reducer.js';
import scoreboard                        from '../apps/scoreboard/reducer.js';
import talkerResult                      from '../apps/talkerResult/reducer.js';
import join                              from '../apps/join/reducer.js';
import lobby                             from '../apps/lobby/reducer.js';
import talker                            from '../apps/talker/reducer.js';
import U                                 from '../../../util';

const gameState = {
    isStarted: false,
    round: 1,
    inviteCode: undefined,
    guesser: {},
    talkers: [],
    player: {},
    letters: [],
    guessWasCorrect: undefined,
    scores: [],
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
    ],
    correctImage: '/images/hamburger.jpeg'
};

const game = (state = gameState, action) => {
    let player;
    let correctImage;
    let images;
    let letters;

    switch (action.type) {
    case 'INVITE_TO_GAME':
        return Object.assign({}, state, {inviteCode: action.code});
  
    case 'TALKER_NEXT_ROUND':
        letters = [];
        return Object.assign({}, state, {letters});
  
    case 'GUESSER_NEXT_ROUND':
        const round   = state.round + 1;
        letters = [];
        return Object.assign({}, state, {round, letters});
  
    case 'SET_IMAGES':
        images       = action.images;
        correctImage = action.correctImage;
        return Object.assign({}, state, {images, correctImage});
  
    case 'SHUFFLE_IMAGES':
        images       = U.shuffleImages(state.images);
        correctImage = images.filter(image => image.isValid)[0].src;
        return Object.assign({}, state, {images, correctImage});
  
    case 'END_GAME':
    case 'REMOTE_END_GAME':
        const tmpState = Object.assign({}, gameState);
        return Object.assign({}, tmpState, {scores: state.scores, inviteCode: action.code});
  
    case 'REWARD_TALKER_POINTS':
        const talkers = U.addTalkerPoints(action.points, state.talkers, state.letters);
        player        = state.talkers.filter(U.isPlayer(state.player))[0];
        return Object.assign({}, state, {talkers, player});
  
    case 'REWARD_GUESSER_POINTS':
        const guesser = U.addGuesserPoints(action.points, state.guesser);
        player        = U.addGuesserPoints(action.points, state.guesser);
        return Object.assign({}, state, {guesser, player});
  
    case 'SET_PLAYER':
        return Object.assign({}, state, {player: action.player});
  
    case 'SET_GUESSER':
        return Object.assign({}, state, {guesser: action.guesser});
  
    case 'SET_SCORE':
        return Object.assign({}, state, {scores: action.scores});
  
    case 'START_TALKING':
        return Object.assign({}, state, {isStarted: true, inviteCode: action.code});
  
    case 'START_GAME':
        return Object.assign({}, state, {isStarted: true, inviteCode: action.code});
  
    case 'INVITE_TO_GAME':
        return Object.assign({}, state, {inviteCode: action.inviteCode});
  
    case 'ADD_TALKER':
        return Object.assign({}, state, {talkers: state.talkers.concat([action.talker])});
  
    case 'REMOTE_ADD_LETTER':
        return Object.assign({}, state, {letters: state.letters.concat([action.letter])});
  
    case 'ADD_LETTER':
        return Object.assign({}, state, {letters: state.letters.concat([action.letter])});
  
    case 'INCORRECT_CHOICE':
        return Object.assign({}, state, {guessWasCorrect: false});
  
    case 'CORRECT_CHOICE':
        return Object.assign({}, state, {guessWasCorrect: true});
  
    case 'SET_INVITE_CODE':
        return Object.assign({}, state, {inviteCode: action.inviteCode});
  
    default:
        return state;
    }
};

const reducers = combineReducers({
  game,
  startscreen, 
  invite, 
  guesser, 
  correct,
  incorrect,
  scoreboard,
  talkerResult,
  join,
  talker,
  lobby
});

export default reducers;
