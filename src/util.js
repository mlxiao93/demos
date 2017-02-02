export const debounce = (fn, timeout = 400) => {
  let timer = null;
  return function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, timeout)
  }
};

export const throttle = (fn, timeout = 400, execLast) => {
  let lastExecTime = 0;
  let timer = null;
  return function() {
    clearTimeout(timer);
    let now = Date.now();
    if (now - lastExecTime > timeout) {
      lastExecTime = now;
      fn.apply(this, arguments);
    } else if(execLast) {    //响应最后一次触发
      timer = setTimeout(() => {
        lastExecTime = now;
        fn.apply(this, arguments);
      }, timeout)
    }
  }
};