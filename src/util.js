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

/**
 * 判断元素是否出现在视口
 * @param el
 * @param allIn 元素是否完整出现在视口
 * @return {boolean}
 */
export const isElementInViewPort = (el, allIn = false) => {
  let viewportWidth = window.innerWidth || document.documentElement.clinetWidth,
    viewportHeight = window.innerHeight || document.doucmentElement.clientHeight,
    rect = el.getBoundingClientRect();

  if (allIn) return rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= viewportHeight &&
    rect.right <= viewportWidth;

  return rect.bottom > 0 &&
    rect.bottom < viewportHeight + el.offsetHeight &&
    rect.right > 0 &&
    rect.right < viewportWidth + el.offsetWidth;
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

export const downloadFile = (fileName, content) =>{
  let aLink = document.createElement('a');
  let blob = new Blob([content]);
  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.dispatchEvent(evt);
};