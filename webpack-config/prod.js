const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');
const path = require('path');

const base = require('./base');

module.exports = webpackMerge(base, {
  output: {
    filename: '[name]/bundle.[chunkhash].js',
    path: process.cwd() + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader?minimize', 'postcss-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false
      }
    }),
    new ExtractTextPlugin({
      filename: "[name]/bundle.[chunkhash].css"
    }),
    // new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.[chunkhash].js"),

    new CleanWebpackPlugin(['dist'], {
      root: process.cwd(),
      exclude: []
    })
  ],
  resolve: {
    alias: {
      config: path.resolve(__dirname, './../src/prod.config.js'),
    }
  }
});
