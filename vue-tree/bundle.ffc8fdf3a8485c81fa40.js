!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=343)}({309:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(328);var a=(n(59),n(319)),c=n(320),u=r(c);Vue.component("tree",{template:n(335),props:{data:Array,rowTemplate:String},data:function(){return{bus:new Vue}},computed:{root:function e(){var e={$root:!0,children:this.data};return(0,a.extendNode)(e,this.lastData),e}},methods:{handleCheckAllToggle:function(){this.root.$toggleCheck(),this.bus.refresh.fire()},handleDeleteCheckedClick:function(){this.$emit("remove-checked",(0,a.findCheckedNodeIds)(this.root))}},components:{treeNodes:u.default},created:function(){var e=this;this.lastData=this.data,this.bus.refresh=new(function(){function e(){i(this,e),this.handles=[]}return o(e,[{key:"register",value:function(e){"function"==typeof e&&this.handles.push(e)}},{key:"fire",value:function(){this.handles.map(function(e){e.call()})}}]),e}()),this.bus.refresh.register(function(){e.$forceUpdate()}),this.bus.$on("add",function(t){e.$emit("add",t)}),this.bus.$on("update",function(t){e.$emit("update",t)}),this.bus.$on("remove",function(t){e.$emit("remove",t)})},beforeUpdate:function(){this.lastData=this.data}})},310:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){var n=t;if(Array.isArray(t)&&(n={children:t}),n.id==e)return n;if(n.children){var r=!0,o=!1,a=void 0;try{for(var c,u=n.children[Symbol.iterator]();!(r=(c=u.next()).done);r=!0){var d=c.value,l=i(e,d);if(l)return l}}catch(e){o=!0,a=e}finally{try{!r&&u.return&&u.return()}finally{if(o)throw a}}}return!1}function o(e,t){var n=t;if(Array.isArray(t)&&(n={children:t}),n.children){var r=n.children.findIndex(function(t){return t.id==e});if(r>=0)return void n.children.splice(r,1);n.children.map(function(t){return o(e,t)})}}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=[{id:1,name:1,children:[{id:11,name:11},{id:12,name:12}]},{id:2,name:2,children:[{id:21,name:21},{id:22,name:22}]}],u=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"MLX_DEMOS_TREE_DATA";r(this,e),this.key="",this.data=[],this.key=t,localStorage.getItem(this.key)||localStorage.setItem(this.key,JSON.stringify(c)),this.data=JSON.parse(localStorage.getItem(this.key))}return a(e,[{key:"_async",value:function(){localStorage.setItem(this.key,JSON.stringify(this.data,function(e,t){if(!/^\$/.test(e))return t})),this.data=JSON.parse(localStorage.getItem(this.key))}},{key:"reset",value:function(){this.data=c,this._async()}},{key:"add",value:function(e,t){if(e){e.id=Date.now();var n=t;if(t&&!(n=i(t.id,this.data)))return console.error("parent node does not exists");n=n||{children:this.data},n.children=n.children||[],n.children.push(e),this._async()}}},{key:"update",value:function(e){if(e){var t=i(e.id,this.data);for(var n in e)t[n]=e[n];this._async()}}},{key:"remove",value:function(e){e&&(o(e.id,this.data),this._async())}},{key:"removeChecked",value:function(e){var t=this;!Array.isArray(e)||e.length<=0||(e.map(function(e){return o(e,t.data)}),this._async())}},{key:"all",value:function(){return JSON.parse(JSON.stringify(this.data))}}]),e}();t.default=u},319:function(e,t,n){"use strict";function r(e,t){if(!t)return!1;var n=t;if(Array.isArray(t)&&(n={children:t}),n.id==e)return n;if(n.children){var i=!0,o=!1,a=void 0;try{for(var c,u=n.children[Symbol.iterator]();!(i=(c=u.next()).done);i=!0){var d=c.value,l=r(e,d);if(l)return l}}catch(e){o=!0,a=e}finally{try{!i&&u.return&&u.return()}finally{if(o)throw a}}}return!1}function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return e.id&&e.$check&&t.push(e.id),e.children&&e.children.map(function(e){return i(e,t)}),t}function o(e,t){var n=r(e.id,t);e.$expand=n&&n.$expand||!1,e.$check=n&&n.$check||!1,e.$hasChildren=function(){return Array.isArray(e.children)&&e.children.length>0},e.$toggleExpand=function(e){this.$expand=void 0===e?!this.$expand:e},e.$toggleCheck=function(e){if(this.$check=void 0===e?this.$check:e,this.$check)this.$hasChildren()&&this.children.map(function(e){return e.$toggleCheck(!0)}),this.$parent&&this.$parent.children.every(function(e){return e.$check})&&(this.$parent.$check=!0);else{this.$hasChildren()&&this.children.map(function(e){return e.$toggleCheck(!1)});for(var t=this.$parent;t;)t.$check=!1,t=t.$parent}},e.$hasChildren()&&e.children.map(function(n){n.$parent=e,o(n,t)})}Object.defineProperty(t,"__esModule",{value:!0}),t.findCheckedNodeIds=i,t.extendNode=o},320:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"tree-nodes",template:n(334),props:{nodes:Array,parent:Object,bus:Object},methods:{add:function(){this.bus.$emit("add",this.parent)},update:function(e){this.bus.$emit("update",e)},remove:function(e){this.bus.$emit("remove",e)},handleItemNameClick:function(e){e.$toggleExpand(),this.$forceUpdate()},handleCheckToggle:function(e){e.$toggleCheck(),this.bus.refresh.fire()}},created:function(){var e=this;this.bus.refresh.register(function(){e.$forceUpdate()}),this.parent.$parent&&this.parent.$parent.$check&&(this.parent.$check=!0,this.bus.refresh.fire())}}},328:function(e,t){},334:function(e,t){e.exports='<ul :class="{expand: parent.$root}"> <li v-for="node in nodes"> <div> <input type=checkbox v-model=node.$check @change=handleCheckToggle(node)> <span @click=handleItemNameClick(node)>{{node.name}}</span> <button @click=update(node)>编辑</button> <button @click=remove(node)>删除</button> </div> <tree-nodes :class="{expand: node.$expand}" :bus=bus :nodes=node.children :parent=node /> </li> <li> <button @click=add>新增</button> </li> </ul>'},335:function(e,t){e.exports="<div class=tree> <div> <input type=checkbox v-model=root.$check @change=handleCheckAllToggle> <button @click=handleDeleteCheckedClick>删除选中</button> </div> <tree-nodes :bus=bus :nodes=root.children :parent=root /> </div>"},343:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}n(309);var i=n(59),o=n(310),a=r(o),c=new a.default;new Vue({el:"#app",data:function(){return{data:c.all()}},methods:{addTreeNode:function(e){var t=prompt("Enter a name");(0,i.isEmpty)(t)||(c.add({name:t},e),this.data=c.all())},updateTreeNode:function(e){var t=prompt("Enter a name",e.name);(0,i.isEmpty)(t)||(e.name=t,c.update(e),this.data=c.all())},removeTreeNode:function(e){c.remove(e),this.data=c.all()},removeCheckedTreeNodes:function(e){c.removeChecked(e),this.data=c.all()}}})},59:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.debounce=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:400,n=null;return function(){var r=this,i=arguments;n&&clearTimeout(n),n=setTimeout(function(){e.apply(r,i)},t)}},t.throttle=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:400,n=arguments[2],r=0,i=null;return function(){var o=this,a=arguments;clearTimeout(i);var c=Date.now();c-r>t?(r=c,e.apply(this,arguments)):n&&(i=setTimeout(function(){r=c,e.apply(o,a)},t))}},t.isElementInViewPort=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=window.innerWidth||document.documentElement.clinetWidth,r=window.innerHeight||document.doucmentElement.clientHeight,i=e.getBoundingClientRect();return t?i.top>=0&&i.left>=0&&i.bottom<=r&&i.right<=n:i.bottom>0&&i.bottom<r+e.offsetHeight&&i.right>0&&i.right<n+e.offsetWidth},t.isEmpty=function(e){return void 0===e||(null===e||(""===e||("string"==typeof e?""===e.trim():"[object Array]"===Object.prototype.toString.call(e)?e.length<=0:e.constructor===Object&&Object.keys(e).length<=0)))},t.deepCopy=function(e){return"object"!==(void 0===e?"undefined":r(e))?e:(console.log(JSON.stringify(e)),JSON.parse(JSON.stringify(e)))},t.downloadFile=function(e,t){var n=document.createElement("a"),r=new Blob([t]),i=document.createEvent("HTMLEvents");i.initEvent("click",!1,!1),n.download=e,n.href=URL.createObjectURL(r),n.dispatchEvent(i)}}});