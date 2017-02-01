export const debounce = (fn, timeout = 400) => {
  let timer = null;
  return function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, timeout)
  }
};

export const throttle = (fn, timeout = 400) => {
  let lastExecTime = 0;
  let timer = null;
  return function() {
    clearTimeout(timer);
    let now = Date.now();
    if (now - lastExecTime > timeout) {
      lastExecTime = now;
      fn.apply(this, arguments);
    } else {    //连续触发的最后一次需要被响应
      timer = setTimeout(() => {
        lastExecTime = now;
        fn.apply(this, arguments);
      }, timeout)
    }
  }
};