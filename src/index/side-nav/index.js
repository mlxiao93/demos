import './index.scss'

export default Vue.component('side-nav', {
  template: require('./index.html'),
  props: {
    navList: Array,
    activeItem: Object
  },
  methods: {
    isItemActivated: function(item) {
      if (!item) return false;
      if (!this.activeItem) return false;
      if (item.entry !== this.activeItem.entry) return false;
      return true;
    },

    closeSearchPanel: function() {
      this.$emit('close-search-panel');
    }
  }
})