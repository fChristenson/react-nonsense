'use strict';

import React                    from 'react';
import { renderToString }       from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import path                     from 'path';
import Hapi                     from 'hapi';
import vision                   from 'vision';
import swig                     from 'swig';
import inert                    from 'inert';
import routes                   from './public/javascript/apps/index.jsx';

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

server.route({
  method:  'GET',
  path:    '/',
  handler: (request, reply) => {
    return reply.view('index');
  }
});

const reactRoutesHandler = (request, reply) => {
  match({routes, location: request.url.path}, (err, redirectLocation, props) => {
    if(err) throw err;
    reply(renderToString(<RouterContext {...props}/>));
  });
};

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
  path:    '/scoreboard',
  handler: reactRoutesHandler
});

module.exports = server;
