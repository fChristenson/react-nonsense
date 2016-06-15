'use strict';

import good                     from 'good';
import goodConsole              from 'good-console';
import IoServer                 from 'socket.io';
import React                    from 'react';
import { renderToString }       from 'react-dom/server';
import { RouterContext, match } from 'react-router/lib';
import { createStore }          from 'redux';
import { Provider }             from 'react-redux';
import path                     from 'path';
import Hapi                     from 'hapi';
import Joi                      from 'Joi';
import vision                   from 'vision';
import swig                     from 'swig';
import inert                    from 'inert';
import routes                   from './public/javascript/apps/index.jsx';
import reducers                 from './public/javascript/reducers';
import U                        from './util';

const store     = createStore(reducers);
const initState = store.getState();

// hapi server
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public')
      }
    }
  }
});

server.app.games = {};
server.connection({port: 3000});

server.register([vision, inert, {
  register: good,
  options: {
    reporters: [
    {
      reporter: goodConsole,
      events: {log: '*', response: '*'}
    }]
  }
}], (err) => {
  if(err) throw err;  

  server.views({
    engines: {
      html: swig
    },
    relativeTo: __dirname,
    path:       'views'
  });

  server.route({
    method:  'GET',
    path:    '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true
      }
    }
  });

  const reactRoutesHandler = (request, reply) => {
    match({routes, location: request.url.path}, (err, redirectLocation, props) => {
      if(err) throw err;
      const html = renderToString(<Provider store={store}><RouterContext {...props}/></Provider>);
      reply.view('index', {html: html, init: initState});
    });
  };

  server.route({
    method:  'GET',
    path:    '/',
    handler: reactRoutesHandler
  });

  server.route({
    method: 'POST',
    path: '/guesser/{code}',
    handler: (request, reply) => {
      const code    = parseInt(request.params.code);
      const state   = server.app.games[code].store.getState();
      const id      = Math.random();
      const guesser = {
        id,
        name: 'P1',
        score: 0,
        color: U.randomHexColor()
      };
      store.dispatch({type: 'SET_GUESSER', guesser});
      reply({state, guesser});
    }
  });

  server.route({
    method: 'POST',
    path: '/invite',
    config: {
      validate: {
        payload: {
          code: Joi.number().required()
        }
      }
    },
    handler: (request, reply) => {
      const code = parseInt(request.payload.code);
      server.app.games[code] = {
        store: createStore(reducers),
        createdAt: Date.now()
      };
      reply({code});
    }
  });

  server.route({
    method: 'GET',
    path: '/score/{code}',
    handler: (request, reply) => {
      const code   = parseInt(request.params.code);
      const state  = server.app.games[code].store.getState();
      const scores = state.game.talkers
        .concat([state.game.guesser])
        .sort(U.sortPlayers);
      reply({scores});
    }
  });

  server.route({
    method: 'POST',
    path: '/talker/{code}',
    handler: (request, reply) => {
      const code        = parseInt(request.params.code);
      const state       = server.app.games[code].store.getState();
      const id          = Math.random();
      const playerCount = state.game.talkers.length + 2;
      const talker      = {
        id,
        name: 'P' + playerCount,
        score: 0,
        color: U.randomHexColor()
      };
      store.dispatch({type: 'ADD_TALKER', talker});
      reply({state, talker});
    }
  });

  server.route({
    method:  'GET',
    path:    '/join',
    handler: reactRoutesHandler
  });

  server.route({
    method:  'GET',
    path:    '/talker/{code}',
    handler: reactRoutesHandler
  });

  server.route({
    method:  'GET',
    path:    '/guesser/{code}',
    handler: reactRoutesHandler
  });

  server.route({
    method:  'GET',
    path:    '/lobby/{code}',
    handler: reactRoutesHandler
  });

  server.route({
    method:  'GET',
    path:    '/invite',
    handler: reactRoutesHandler
  });

  server.route({
    method:  'GET',
    path:    '/correct/{code}',
    handler: reactRoutesHandler
  });

  server.route({
    method:  'GET',
    path:    '/incorrect/{code}',
    handler: reactRoutesHandler
  });

  server.route({
    method:  'GET',
    path:    '/result/{code}',
    handler: reactRoutesHandler
  });

  server.route({
    method:  'GET',
    path:    '/scoreboard/{code}',
    handler: reactRoutesHandler
  });

  // socket io server
  const io = new IoServer().attach(3001);

  io.on('connect', (socket) => {
    socket.on('JOIN_GAME', action => {
      server.log('debug', action);
      socket.join(action.code);
      action.type = 'ADD_TALKER';
      server.app.games[action.code].store.dispatch(action);
    });
    socket.on('REWARD_GUESSER_POINTS', action => {
      server.log('debug', action);
      server.app.games[action.code].store.dispatch(action);
    });
    socket.on('SCOREBOARD', action => {
      server.log('debug', action);
      action.type = 'REMOTE_SCOREBOARD';
      socket.broadcast.to(action.code).emit('REMOTE_SCOREBOARD', action);
    });
    socket.on('GUESS_WAS_MADE', action => {
      server.log('debug', action);
      if (action.guessWasCorrect) {
        const talkerAction = {type: 'REWARD_TALKER_POINTS', points: 5};
        server.app.games[action.code].store.dispatch(talkerAction);
        socket.broadcast.to(action.code).emit('REWARD_TALKER_POINTS', talkerAction);
      }
      socket.broadcast.to(action.code).emit('GUESS_WAS_MADE', action);
    });
    socket.on('GUESSER_NEXT_ROUND', action => {
      server.log('debug', action);
      server.app.games[action.code].store.dispatch({type: 'SHUFFLE_IMAGES'});
      const state        = server.app.games[action.code].store.getState();
      const images       = state.game.images;
      const correctImage = state.game.correctImage;
      io.to(action.code).emit('SET_IMAGES', {type: 'SET_IMAGES', images, correctImage});
      action.type        = 'TALKER_NEXT_ROUND';
      socket.broadcast.to(action.code).emit('TALKER_NEXT_ROUND', action);
    });
    socket.on('END_GAME', action => {
      server.log('debug', action);
      action.type = 'REMOTE_END_GAME';
      server.app.games[action.code].store.dispatch(action);
      socket.broadcast.to(action.code).emit('REMOTE_END_GAME', action);
    });
    socket.on('START_GAME', action => {
      server.log('debug', action);
      action.type        = 'SET_GUESSER';
      server.app.games[action.code].store.dispatch(action);
      server.app.games[action.code].store.dispatch({type: 'SHUFFLE_IMAGES'});
      const state        = server.app.games[action.code].store.getState();
      const images       = state.game.images;
      const correctImage = state.game.correctImage;
      action.type        = 'START_TALKING';
      io.to(action.code).emit('START_TALKING', action);
      socket.join(action.code);
      io.to(action.code).emit('SET_IMAGES', {type: 'SET_IMAGES', images, correctImage});
    });
    socket.on('ADD_LETTER', action => {
      server.log('debug', action);
      server.app.games[action.code].store.dispatch(action);
      action.type = 'REMOTE_ADD_LETTER';
      socket.broadcast.to(action.code).emit('REMOTE_ADD_LETTER', action);
    });
  });
});

export default server
