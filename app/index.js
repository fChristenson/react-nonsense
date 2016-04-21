'use strict';

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
const games     = {};
// socket io server
const io        = new IoServer().attach(3001);

io.on('connect', (socket) => {
  socket.on('JOIN_GAME', action => {
    console.log('join', action);
    socket.join(action.code);
    action.type = 'ADD_TALKER';
    games[action.code].store.dispatch(action);
  });
  socket.on('REWARD_GUESSER_POINTS', action => {
    console.log('reward', action);
    games[action.code].store.dispatch(action);
  });
  socket.on('SCOREBOARD', action => {
    console.log('score', action);
    action.type = 'REMOTE_SCOREBOARD';
    socket.broadcast.to(action.code).emit('REMOTE_SCOREBOARD', action);
  });
  socket.on('GUESS_WAS_MADE', action => {
    console.log('guess', action);
    if (action.guessWasCorrect) {
      const talkerAction = {type: 'REWARD_TALKER_POINTS', points: 5};
      games[action.code].store.dispatch(talkerAction);
      socket.broadcast.to(action.code).emit('REWARD_TALKER_POINTS', talkerAction);
    }
    socket.broadcast.to(action.code).emit('GUESS_WAS_MADE', action);
  });
  socket.on('GUESSER_NEXT_ROUND', action => {
    console.log('next round', action);
    games[action.code].store.dispatch({type: 'SHUFFLE_IMAGES'});
    const state        = games[action.code].store.getState();
    const images       = state.game.images;
    const correctImage = state.game.correctImage;
    io.to(action.code).emit('SET_IMAGES', {type: 'SET_IMAGES', images, correctImage});
    action.type        = 'TALKER_NEXT_ROUND';
    socket.broadcast.to(action.code).emit('TALKER_NEXT_ROUND', action);
  });
  socket.on('END_GAME', action => {
    console.log('end', action);
    action.type = 'REMOTE_END_GAME';
    games[action.code].store.dispatch(action);
    socket.broadcast.to(action.code).emit('REMOTE_END_GAME', action);
  });
  socket.on('START_GAME', action => {
    console.log('start', action);
    action.type        = 'SET_GUESSER';
    games[action.code].store.dispatch(action);
    games[action.code].store.dispatch({type: 'SHUFFLE_IMAGES'});
    const state        = games[action.code].store.getState();
    const images       = state.game.images;
    const correctImage = state.game.correctImage;
    action.type        = 'START_TALKING';
    io.to(action.code).emit('START_TALKING', action);
    socket.join(action.code);
    io.to(action.code).emit('SET_IMAGES', {type: 'SET_IMAGES', images, correctImage});
  });
  socket.on('ADD_LETTER', action => {
    console.log('add', action);
    games[action.code].store.dispatch(action);
    action.type = 'REMOTE_ADD_LETTER';
    socket.broadcast.to(action.code).emit('REMOTE_ADD_LETTER', action);
  });
});

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

server.connection({port: 3000});

server.register(vision, err => {
  if(err) throw err;
  server.views({
    engines: {
      html: swig
    },
    relativeTo: __dirname,
    path:       'views'
  });
});

server.register(inert, err => {
  if(err) throw err;
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
    console.log('guesser route', request.params);
    const code    = parseInt(request.params.code);
    const state   = games[code].store.getState();
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
    console.log('invite route', request.payload);
    const code = parseInt(request.payload.code);
    games[code] = {
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
    console.log('score route', request.params);
    const code   = parseInt(request.params.code);
    const state  = games[code].store.getState();
    const scores = state.game.talkers
      .concat([state.game.guesser])
      .sort((p1, p2) => {
        const p1Num = parseInt(p1 && p1.name ? p1.name.substring(1) : 0);
        const p2Num = parseInt(p2 && p2.name ? p2.name.substring(1) : 0);
        return p1Num - p2Num;
      });
    reply({scores});
  }
});

server.route({
  method: 'POST',
  path: '/talker/{code}',
  handler: (request, reply) => {
    console.log('talker route', request.params);
    const code        = parseInt(request.params.code);
    const state       = games[code].store.getState();
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

module.exports = server;
