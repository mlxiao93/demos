!function(e){function t(n){if(s[n])return s[n].exports;var r=s[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var s={};return t.m=e,t.c=s,t.i=function(e){return e},t.d=function(e,s,n){t.o(e,s)||Object.defineProperty(e,s,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(s,"a",s),s},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=343)}({318:function(e,t){},343:function(e,t,s){"use strict";s(318),new Vue({el:"#app",data:function(){return{messages:[]}},methods:{addOne:function(){var e=this.messages[0].id;this.messages.unshift({id:e+1,content:"第"+(e+1)+"条消息，hahaha"}),this.$refs.textarea.focus()},loadMore:function(){for(var e=this.messages[this.messages.length-1].id,t=1;t<=5;t++)this.messages.push({id:e-t,content:"第"+(e-t)+"条消息，hahaha"})},focus:function(){this.$refs.list.scrollTop=this.$refs.list.scrollHeight}},created:function(){for(var e=100;e<=105;e++)this.messages.push({id:e,content:"第"+e+"条消息，hahaha"});this.messages.reverse()},mounted:function(){console.log(this.$refs.input)}})}});