'use strict';

import IoServer                 from 'socket.io';
import React                    from 'react';
import { renderToString }       from 'react-dom/server';
import { RouterContext, match } from 'react-router/lib';
import { createStore }          from 'redux';
import { Provider }             from 'react-redux';
import path                     from 'path';
import Hapi                     from 'hapi';
import vision                   from 'vision';
import swig                     from 'swig';
import inert                    from 'inert';
import routes                   from './public/javascript/apps/index.jsx';
import reducers                 from './public/javascript/reducers';

const store = createStore(reducers);

// socket io server
const io    = new IoServer().attach(3001);

io.on('connect', (socket) => {
  socket.on('SCOREBOARD', (action) => {
    action.type = 'REMOTE_SCOREBOARD';
    socket.broadcast.emit('REMOTE_SCOREBOARD', action);
  });
  socket.on('START_GAME', () => {
    socket.broadcast.emit('START_TALKING', {type: 'START_TALKING'});
  });
  socket.on('ADD_LETTER', (action) => {
    store.dispatch(action);
    action.type = 'REMOTE_ADD_LETTER';
    socket.broadcast.emit('REMOTE_ADD_LETTER', action);
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
    const initState = store.getState();
    const html      = renderToString(<Provider store={store}><RouterContext {...props}/></Provider>);
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
  path: '/guesser',
  handler: (request, reply) => {
    const state       = store.getState();
    const id          = Math.random();
    const guesser     = {
      id,
      name: 'P1',
      score: 0
    };
    store.dispatch({type: 'SET_GUESSER', guesser});
    reply({state, guesser});
  }
});

server.route({
  method: 'GET',
  path: '/score',
  handler: (request, reply) => {
    const state = store.getState();
    const scores = state.game.talkers
      .concat([state.game.guesser])
      .sort((p1, p2) => {
        const p1Num = parseInt(p1.name.substring(1));
        const p2Num = parseInt(p2.name.substring(1));
        return p1Num - p2Num;
      });
    reply({scores});
  }
});

server.route({
  method: 'POST',
  path: '/talker',
  handler: (request, reply) => {
    const state       = store.getState();
    const id          = Math.random();
    const playerCount = state.game.talkers.length + 2;
    const talker      = {
      id,
      name: 'P' + playerCount,
      score: 0
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
  path:    '/talker',
  handler: reactRoutesHandler
});

server.route({
  method:  'GET',
  path:    '/guesser',
  handler: reactRoutesHandler
});

server.route({
  method:  'GET',
  path:    '/lobby',
  handler: reactRoutesHandler
});

server.route({
  method:  'GET',
  path:    '/invite',
  handler: reactRoutesHandler
});

server.route({
  method:  'GET',
  path:    '/correct',
  handler: reactRoutesHandler
});

server.route({
  method:  'GET',
  path:    '/incorrect',
  handler: reactRoutesHandler
});

server.route({
  method:  'GET',
  path:    '/result',
  handler: reactRoutesHandler
});

server.route({
  method:  'GET',
  path:    '/scoreboard',
  handler: reactRoutesHandler
});

module.exports = server;
