import './index.scss'
import bus from '../../index'
import {events} from '../../index'

export default Vue.component('search-bar', {
  template: require('./index.html'),
  props: ['value'],
  methods: {
    updateValue: function (value) {
      this.$emit('input', value);
    },
    inputMouseDown: function () {
      bus.$emit(events.inputMouseDown);
    },
    clearKeywords: function () {
      this.updateValue('');
    }
  }
})