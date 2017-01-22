import './index.scss'
import bus from '../../index'
import {events} from '../../index'

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
      bus.$emit(events.toggleAppAside);
    }
  }
})