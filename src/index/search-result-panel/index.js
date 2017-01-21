import './index.scss'

export default Vue.component('search-result-panel', {
  template: require('./index.html'),
  props: ['showSearchPanel'],
  methods: {
    closeSearchPanel: function() {
      this.$emit('close-search-panel');
    }
  }
})