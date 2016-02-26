'use strict';

var precss       = require('precss');
var autoprefixer = require('autoprefixer');
var path         = require('path');

module.exports = {
  context: path.join(__dirname, 'app', 'public', 'javascript'),
  entry:   './index.jsx',
  output: {
    path:     path.join(__dirname, 'app', 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loader:  'babel'
      },
      {
        test:    /\.scss$/,
        exclude: /node_modules/,
        loader:  'style!css!postcss'
      }
    ]
  },
  postcss: function () {
    return [precss, autoprefixer];
  }
};