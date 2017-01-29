const devModule = require('./webpack-config/dev');
const prodModule = require('./webpack-config/prod');

let comboModule = {};

let ENV = process.env.NODE_ENV;

console.log('~ current node environment is ' + ENV + ' ~');

if ( ENV === 'dev') {
  comboModule = devModule;
} else if ( ENV === 'prod') {
  comboModule = prodModule
}

module.exports = comboModule;