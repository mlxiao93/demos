import './index.scss'

new Vue({
  el: '#app',
  data: function () {
    return {
      messages: []
    }
  },
  methods: {
    addOne() {
      let latestId = this.messages[0].id;
      this.messages.unshift({
        id: latestId + 1,
        content: `第${latestId + 1}条消息，hahaha`
      });
      this.$refs.textarea.focus();
    },
    loadMore() {
      let earliestId = this.messages[this.messages.length - 1].id;
      for (let i = 1; i <= 5; i++) {
        this.messages.push({
          id: earliestId - i,
          content: `第${earliestId - i}条消息，hahaha`
        });
      }
    }
  },
  created() {
    for (let i = 100; i <= 105; i++) {
      this.messages.push({
        id: i,
        content: `第${i}条消息，hahaha`
      });
    }
    this.messages.reverse();
  },
  mounted() {
    console.log(this.$refs.input)
  }
});