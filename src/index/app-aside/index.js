import './index.scss'

export default Vue.component('app-aside', {
  template: require('./index.html'),
  props: {
    withSearchPanel: null
  },
  methods: {
    toggleAppAside: function(value) {
      this.$emit('toggle', value)
    }
  }
});