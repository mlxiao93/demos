export default {
  name: 'tree-nodes',
  template: require('./tree-nodes.html'),
  props: {
    nodes: Array,
    parent: Object,
    bus: Object
  },
  methods: {
    add: function() {
      this.bus.$emit('add', this.parent)
    },
    update: function(node) {
      this.bus.$emit('update', node);
    },
    remove: function(node) {
      this.bus.$emit('remove', node);
    },
    handleItemNameClick: function(node) {
      node.$toggleExpand();
      this.$forceUpdate();
    },
    handleCheckToggle: function (node) {
      node.$toggleCheck();
      this.bus.refresh.fire();
    }
  },
  created() {
    this.bus.refresh.register(() => {
      this.$forceUpdate();
    })
  }
}