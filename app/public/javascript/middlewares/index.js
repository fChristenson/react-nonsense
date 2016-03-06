'use strict';

import agent    from 'superagent';
import reducers from '../reducers';

const hasLetter = (letters, id) => {
  return letters.filter(obj => obj.id === id).length > 0;
};

export default socket => store => next => action => {
  console.log('action sent', store.getState(), action);
  switch(action.type) {
    case 'END_GAME':
      socket.emit('END_GAME', {type: 'END_GAME'});
      return next(action);
    case 'REWARD_GUESSER_POINTS':
      socket.emit('REWARD_GUESSER_POINTS', action);
      return next(action);
    case 'CORRECT_CHOICE':
      socket.emit('GUESS_WAS_MADE', {type: 'GUESS_WAS_MADE', guessWasCorrect: true, selectedImage: action.selectedImage});
      return next(action);
    case 'INCORRECT_CHOICE':
      socket.emit('GUESS_WAS_MADE', {type: 'GUESS_WAS_MADE', guessWasCorrect: false, selectedImage: action.selectedImage});
      return next(action);
    case 'REMOTE_SCOREBOARD':
      return agent.get('/score')
        .then(res => {
          const { scores } = res.body;
          store.dispatch({type: 'SET_SCORE', scores});
          return next(action);
        });
    case 'SCOREBOARD':
      return agent.get('/score')
        .then(res => {
          const { scores } = res.body;
          store.dispatch({type: 'SET_SCORE', scores});
          socket.emit('SCOREBOARD', action);
          return next(action);
        });
    case 'LOBBY':
      return agent.post('/talker')
        .then(res => {
          const { talker } = res.body;
          store.dispatch({type: 'SET_PLAYER', player: talker});
          store.dispatch({type: 'ADD_TALKER', talker});
          return next(action);
        });
    case 'START_GAME':
      return agent.post('/guesser')
        .then(res => {
          const { guesser } = res.body;
          store.dispatch({type: 'SET_PLAYER', player: guesser});
          store.dispatch({type: 'SET_GUESSER', guesser});
          socket.emit('START_GAME', action);
          return next(action);
        });
    case 'ADD_LETTER':
      if (!hasLetter(store.getState().game.letters, action.letter.id)) {
        socket.emit('ADD_LETTER', action); 
      }
      return next(action);
    default:
      return next(action);
  }
};

