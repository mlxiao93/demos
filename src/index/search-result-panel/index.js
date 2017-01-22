import './index.scss'
import bus from '../../'
import {events} from '../../'

export default Vue.component('search-result-panel', {
  template: require('./index.html'),
  props: ['showSearchPanel'],
  methods: {
    closeSearchPanel: function() {
      bus.$emit(events.closeSearchPanel)
    }
  }
})