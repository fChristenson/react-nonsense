'use strict';

var path   = require('path');
var Hapi   = require('hapi');
var vision = require('vision');
var swig   = require('swig');
var inert  = require('inert');
var server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public')
      }
    }
  }
});

server.connection({port: 3000});

server.register(vision, function(err) {
  if(err) throw err;
  server.views({
    engines: {
      html: swig
    },
    relativeTo: __dirname,
    path:       'views'
  });
});

server.register(inert, function(err) {
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
  handler: function(request, reply) {
    return reply.view('index');
  }
});

module.exports = server;