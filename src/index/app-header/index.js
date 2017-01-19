export default Vue.component('app-header', {
  template: require('./index.html'),
  props: [
    'hideAppAsideOnDesktop',
    'activeDemo',
    'iframeLoading',
    'demoSrc'
  ],
  methods: {
    toggleAppAside: function() {
      this.$emit('toggle-app-aside');
    }
  }
})