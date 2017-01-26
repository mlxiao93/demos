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
    rules: [
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      config: path.resolve(__dirname, './../src/dev.config.js')
    }
  }
});
