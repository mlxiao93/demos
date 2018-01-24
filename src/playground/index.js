import './index.scss'

new Vue({
    el: '#playground',
    hello() {
      return function () {
          return this.foo + '456'
      }
    },
    data() {
        return {
            foo: 123
        }
    },
    computed: {
        getFoo: this.hello()
    }
    // computed() {
    //     console.log(this.foo);
    //     return {
    //         getFoo: () => {
    //             return this.foo + 'aa'
    //         }
    //     }
    // }
});
