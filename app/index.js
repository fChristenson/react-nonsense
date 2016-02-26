'use strict';

import { renderToString }       from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import path                     from 'path';
import Hapi                     from 'hapi';
import vision                   from 'vision';
import swig                     from 'swig';
import inert                    from 'inert';

const server   = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public')
      }
    }
  }
});

server.connection({port: 3000});

server.register(vision, (err) => {
  if(err) throw err;
  server.views({
    engines: {
      html: swig
    },
    relativeTo: __dirname,
    path:       'views'
  });
});

server.register(inert, (err) => {
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

server.route({
  method:  'GET',
  path:    '/scoreboard',
  handler: function(request, reply) {
    Router.match({routes: ['/scoreboard'], location: request.url.path}, function(err, redirectLocation, props) {
      if(err) throw err;
      console.log(err, redirectLocation, props);
      reply('foo');
    });
  }
});

module.exports = server;