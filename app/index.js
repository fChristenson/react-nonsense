'use strict';

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
    const store     = createStore(reducers);
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
