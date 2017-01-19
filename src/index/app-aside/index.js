export default Vue.component('app-aside', {
  template: require('./index.html'),
  props: {
    hideAppAsideOnDesktop: null,
    showAppAsideOnMobile: null,
    showSearchPanel: null
  },
  methods: {
    toggleAppAside: function(value) {
      this.$emit('toggle-app-aside', value)
    }
  }
});