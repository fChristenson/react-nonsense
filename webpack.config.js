'use strict';

var precss       = require('precss');
var autoprefixer = require('autoprefixer');
var path         = require('path');

module.exports = {
  context: path.join(__dirname, 'app', 'public', 'javascript'),
  entry:   './index.jsx',
  devtool: 'eval-source-map',
  output: {
    path:     path.join(__dirname, 'app', 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './app/views/'
  },
  module: {
    loaders: [
    {
      test:    /\.jsx?$/,
      exclude: /node_modules/,
      loader:  'babel',
      query: {
        presets: ['react', 'es2015']
      }
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
