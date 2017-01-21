import './index.scss'

export default Vue.component('search-bar', {
  template: require('./index.html'),
  props: ['value'],
  methods: {
    updateValue: function (value) {
      this.$emit('input', value);
    },
    inputMouseDown: function () {
      this.$emit('input-mouse-down');
    },
    clearKeywords: function () {
      this.$emit('clear-keywords');
    }
  }
})