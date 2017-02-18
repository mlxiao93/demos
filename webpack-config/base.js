const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const demos = require('../demo-list');

let entry = {
  index: process.cwd() + '/src/index.js',
};
let htmlWebpackPlugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    chunks: ['index'],
    template: process.cwd() + '/src/index.html',
    favicon: process.cwd() + '/src/favicon.ico'
  })
];
demos.map(demo => {
  entry[demo.entry] = process.cwd() + '/src/' + demo.entry + '/index.js';
  htmlWebpackPlugins.push(new HtmlWebpackPlugin({
    filename: demo.entry + '/index.html',
    chunks: [demo.entry],
    template: process.cwd() + '/src/' + demo.entry + '/index.html'
  }));
});

module.exports = {
  entry: entry,
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: path.resolve(__dirname, './../src')
    }
  },
  plugins: [...htmlWebpackPlugins],
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: true
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
          hash: 'sha512',
          publicPath: '/',
          name: 'assets/images/[hash].[ext]'
        }
      }
    ]
  },
};