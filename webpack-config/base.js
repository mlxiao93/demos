const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const demos = require('../demo-list');

let entry = {
  index: process.cwd() + '/src/index.js',
};
let plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    chunks: ['index'],
    template: process.cwd() + '/src/index.html',
    favicon: process.cwd() + '/src/favicon.ico'
  })
];
demos.map(demo => {
  entry[demo.entry] = process.cwd() + '/src/' + demo.entry + '/index.js';
  plugins.push(new HtmlWebpackPlugin({
    filename: demo.entry + '/index.html',
    chunks: [demo.entry],
    template: process.cwd() + '/src/' + demo.entry + '/index.html'
  }));
});

module.exports = {
  // entry: {
  //   index: process.cwd() + '/src/index.js',
  //   home: process.cwd() + '/src/home/index.js'
  // },
  entry: entry,
  resolve: {
    extensions: ['', '.js'],
    alias: {
      src: path.resolve(__dirname, './../src')
    }
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     filename: 'index.html',
  //     chunks: ['index'],
  //     template: process.cwd() + '/src/index.html',
  //     favicon: process.cwd() + '/src/favicon.ico'
  //   }),
  //   new HtmlWebpackPlugin({
  //     filename: 'home/index.html',
  //     chunks: ['home'],
  //     template: process.cwd() + '/src/home/index.html'
  //   })
  // ],
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.html$/,
        loader: 'html',
        query: {
          minimize: true
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=10000&hash=sha512&digest=hex&name=img/[hash].[ext]'
        ]
      }
    ]
  },
};