import "babel-polyfill";
import 'whatwg-fetch'

const CONFIG = {
  tokenKey: 'JWT_TOKEN',
  beforeEach: null,
  afterEach: null
};

function convertUrl(url) {
  if (!Array.isArray(url)) return url;

  let params = JSON.parse(JSON.stringify(url[1])) || {};
  url = url[0];

  if (/{.*}/.test(url)) {    //有pathParam, 先填充pathParam
    let placeholders = url.match(/{.*?}/g);    //利用match匹配出所有占位符
    placeholders && placeholders.map(placeholder => {
      let key = (/{(.*?)}/.exec(placeholder) || [])[1];  //利用exec匹配出param key
      let value = params[key];
      if (value !== undefined) {
        url = url.replace(placeholder, value);
        delete params[key];
      }
    })
  }

  let paramsStr = Object.keys(params).map(key => {     //请求参数字符串
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
  return paramsStr ? url + '?' + paramsStr : url;

}

function setToken(token) {
  localStorage.setItem(CONFIG.tokenKey, token);   //将token保存在localStorage
}
function getToken() {
  return localStorage.getItem(CONFIG.tokenKey);
}

/***
 * @param url 支持以数组的形式包含query params和path params
 * @param init 原生feth的第二个参数
 * @param needToken 是否需要发送token
 * @return {Promise.<Promise.<TResult>|*>}
 */
let $fetch = async (url, init = {}, needToken = false) => {
  let _url = convertUrl(url);
  init.headers = init.headers || {};
  if (needToken) {
    init.headers[CONFIG.tokenKey] = getToken();
  }
  if (typeof init.body === 'object' && !(a instanceof FormData)) {
    init.body = JSON.stringify(init.body);     //将非FormData的Object body做stringify处理
  }

  CONFIG.beforeEach && CONFIG.beforeEach();
  let res = await fetch(_url, init).then(res => {    //调用原生fetch
    let token = res.headers.get(CONFIG.tokenKey);
    if (token) setToken(token);     //保存jwt token
    return res;
  });
  CONFIG.afterEach && CONFIG.afterEach();
  return res;
};

$fetch.init = ({tokenKey = 'JWT_TOKEN', beforeEach, afterEach} = {}) => {
  CONFIG.tokenKey = tokenKey;
  if (typeof beforeEach === 'function') CONFIG.beforeEach = beforeEach;
  if (typeof afterEach === 'function') CONFIG.afterEach = afterEach;
};

export default $fetch;