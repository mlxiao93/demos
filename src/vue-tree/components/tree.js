import './tree.scss'
import {isEmpty} from 'src/util';
import {extendNode} from './service'

const treeBus = new Vue();

const treeNodes = {
  name: 'tree-nodes',
  template: require('./tree-nodes.html'),
  props: {
    nodes: Array,
    parent: Object
  },
  methods: {
    add: function() {
      treeBus.$emit('add', this.parent)
    },
    update: function(node) {
      treeBus.$emit('update', node);
    },
    remove: function(node) {
      treeBus.$emit('remove', node);
    },

    handleItemNameClick: function(node) {
      node.$toggleExpand();
      this.$forceUpdate();
    }
  }
};

Vue.component('tree', {
  template: `
    <div class="tree">
      <tree-nodes :nodes="nodes" :parent="root"/>
    </div>
  `,
  props: {
    data: Array
  },
  data() {
    return {
      lastData: null
    }
  },
  methods: {

  },
  computed: {
    root: function() {
      return {$root: true, children: this.data};
    },
    nodes: function() {
      extendNode(this.root, this.lastData);
      return this.data;
    }
  },
  components: {
    treeNodes
  },
  created: function() {
    this.lastData = this.data;

    treeBus.$on('add', (parent) => {
      this.$emit('add', parent);
    });
    treeBus.$on('update', node => {
      this.$emit('update', node);
    });
    treeBus.$on('remove', node => {
      this.$emit('remove', node);
    });
  },
  beforeUpdate: function () {
    this.lastData = this.data;
  }
});