!function(n){function t(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return n[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var e={};t.m=n,t.c=e,t.i=function(n){return n},t.d=function(n,e,i){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:i})},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},t.p="",t(t.s=340)}({316:function(n,t){},340:function(n,t,e){"use strict";e(316),function(n){var t=0,e=0;n.map(function(i){var o=i.textContent.length,r=.05*o;t+=e,e=r,i.style.width=o+"ch",i.style.animationDelay=t+"s",i.style.animationDuration=r+"s, 0.5s",i.style.animationTimingFunction="steps("+o+"), steps(1)",["animationend","webkitAnimationEnd","oAnimationEnd","msAnimationEnd"].map(function(t){i.addEventListener(t,function(){n.indexOf(i)!==n.length-1&&(i.style.border="none")})})})}(Array.prototype.slice.call(document.querySelectorAll(".typing")))}});