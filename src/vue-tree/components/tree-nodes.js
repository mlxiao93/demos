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
    });

    //解决父元素被选中时，新增的子元素不自动选中的问题
    if (this.parent.$parent && this.parent.$parent.$check) {
      this.parent.$check = true;
      this.bus.refresh.fire();
    }
  }
}