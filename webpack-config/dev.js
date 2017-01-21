const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const base = require('./base');

module.exports = webpackMerge(base, {
  output: {
    filename: '[name].bundle.js'
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style!css?sourceMap!postcss!sass?sourceMap'
      }
    ]
  },
  resolve: {
    alias: {
      config: path.resolve(__dirname, './../src/dev.config.js')
    }
  }
});
