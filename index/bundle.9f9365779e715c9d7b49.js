!function(e){function i(t){if(o[t])return o[t].exports;var p=o[t]={exports:{},id:t,loaded:!1};return e[t].call(p.exports,p,p.exports,i),p.loaded=!0,p.exports}var o={};return i.m=e,i.c=o,i.p="",i(0)}([function(e,i,o){"use strict";o(1),new Vue({el:"#app",data:{hideAppAsideOnDesktop:!1,showAppAsideOnMobile:!1},methods:{toggleAppAside:function(e){return void 0!==e?void(this.hideAppAsideOnDesktop=this.showAppAsideOnMobile=!!e):(this.hideAppAsideOnDesktop=!this.hideAppAsideOnDesktop,void(this.showAppAsideOnMobile=!this.showAppAsideOnMobile))}},computed:{iframeUrl:function(){return location.origin+location.pathname+"home"}}})},function(e,i){}]);