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

const gameState = {
  isStarted: false,
  inviteCode: undefined,
  guesser: {},
  talkers: [],
  player: {},
  letters: [],
  guessWasCorrect: undefined,
  scores: []
};

const game = (state = gameState, action) => {
  switch (action.type) {
    case 'UPDATE_STATE':
      delete action.state.game.player;
      return Object.assign({}, state, action.state);
    case 'SET_PLAYER':
      return Object.assign({}, state, {player: action.player});
    case 'SET_GUESSER':
      return Object.assign({}, state, {guesser: action.guesser});
    case 'SET_SCORE':
      return Object.assign({}, state, {scores: action.scores});
    case 'START_GAME':
      return Object.assign({}, state, {isStarted: true});
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
