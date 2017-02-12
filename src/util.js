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

export const isElementInViewPort = el => {
  let rect = el.getBoundingClientRect();
  return rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};

export const isEmpty = (val) => {
  if (val === undefined) return true;
  if (val === null) return true;
  if (val === '') return true;

  if (typeof val === 'string') {
    if (val.trim() === '') return true;
    return false;
  }

  if (Object.prototype.toString.call(val) === '[object Array]') {   //Array.isArray(val)
    if (val.length <= 0) return true;
    return false;
  }

  if (val.constructor === Object && Object.keys(val).length <= 0) return true;

  return false;
};

export const deepCopy = obj => {
  if (typeof obj !== 'object') return obj;
  console.log(JSON.stringify(obj));
  return JSON.parse(JSON.stringify(obj));
};