import './index.scss'

import "babel-polyfill";

function* foo(x) {
  let y = yield x + 2;
  return y;
}