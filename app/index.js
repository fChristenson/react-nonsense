'use strict';

var Hapi   = require('hapi');
var server = new Hapi.Server();
var vision = require('vision');
var swig   = require('swig');

server.connection({port: 3000});

server.register(vision, function(err) {
  server.views({
    engines: {
      html: swig
    },
    relativeTo: __dirname,
    path:       'views'
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