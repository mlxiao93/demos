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
  console.log(obj);
  console.log(JSON.stringify(obj));
  return JSON.parse(JSON.stringify(obj));
};