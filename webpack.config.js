'use strict';

var path = require('path');

module.exports = {
  context:    path.join(__dirname, 'app'),
  entry:      path.join('public', 'javascript'),
  output: {
    path:     path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};