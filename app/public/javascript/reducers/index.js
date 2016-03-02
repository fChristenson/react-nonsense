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

const reducers = combineReducers({
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
