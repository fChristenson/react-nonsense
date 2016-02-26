'use strict';

var server = require('./app');

server.start(function (err) {
  if(err) throw err;
  console.log('Running at: ', server.info.uri);
});