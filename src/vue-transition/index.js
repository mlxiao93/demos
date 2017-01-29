import './index.scss'

new Vue({
  el: '#demo',
  data: {
    items: []
  },
  methods: {
    doShuffle: function() {
      this.items = _.shuffle(this.items);
    }
  },
  created() {
    for (let i = 1; i <= 25; i++) {
      this.items.push(i);
    }
  }
});