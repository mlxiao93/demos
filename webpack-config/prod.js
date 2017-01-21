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
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')    //将css从js中独立出来
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
    new ExtractTextPlugin("[name]/bundle.[chunkhash].css"),
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
