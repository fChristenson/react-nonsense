'use strict';

import agent    from 'superagent';

const hasLetter = (letters, id) => {
    return letters.filter(obj => obj.id === id).length > 0;
};

export default socket => store => next => action => {
    switch(action.type) {
    
    case 'INVITE_TO_GAME':
        return agent.post('/invite')
          .send({code: action.code})
          .then(() => {
              next(action); 
          });
    
    case 'GUESSER_NEXT_ROUND':
        socket.emit('GUESSER_NEXT_ROUND', action);
        return next(action);
    
    case 'END_GAME':
        socket.emit('END_GAME', {type: 'END_GAME', code: action.code});
        return next(action);
    
    case 'REWARD_GUESSER_POINTS':
        socket.emit('REWARD_GUESSER_POINTS', action);
        return next(action);
    
    case 'CORRECT_CHOICE':
        socket.emit('GUESS_WAS_MADE', {type: 'GUESS_WAS_MADE', guessWasCorrect: true, selectedImage: action.selectedImage, code: action.code});
        return next(action);
    
    case 'INCORRECT_CHOICE':
        socket.emit('GUESS_WAS_MADE', {type: 'GUESS_WAS_MADE', guessWasCorrect: false, selectedImage: action.selectedImage, code: action.code});
        return next(action);
    
    case 'REMOTE_SCOREBOARD':
        return agent.get('/score/' + action.code)
          .then(res => {
              const { scores } = res.body;
              store.dispatch({type: 'SET_SCORE', scores, code: action.code});
              return next(action);
          });
    
    case 'SCOREBOARD':
        return agent.get('/score/' + action.code)
          .then(res => {
              const { scores } = res.body;
              store.dispatch({type: 'SET_SCORE', scores, code: action.code});
              socket.emit('SCOREBOARD', action);
              return next(action);
          });
    
    case 'LOBBY':
        return agent.post('/talker/' + action.code)
          .then(res => {
              const { talker } = res.body;
              store.dispatch({type: 'SET_PLAYER', player: talker});
              store.dispatch({type: 'ADD_TALKER', talker});
              const actionToSend = Object.assign({}, action, {type: 'JOIN_GAME', talker});
              socket.emit('JOIN_GAME', actionToSend);
              return next(action);
          });
    
    case 'START_GAME':
        return agent.post('/guesser/' + action.code)
          .then(res => {
              const { guesser } = res.body;
              store.dispatch({type: 'SET_PLAYER', player: guesser});
              store.dispatch({type: 'SET_GUESSER', guesser});
              action.guesser = guesser;
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

