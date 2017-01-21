import './index.scss'
import bus from 'src/index'
import {events} from 'src/index'

export default Vue.component('app-aside', {
  template: require('./index.html'),
  props: {
    withSearchPanel: null
  },
  methods: {
    toggleAppAside: function(value) {
      bus.$emit(events.toggleAppAside, value);
    }
  }
});