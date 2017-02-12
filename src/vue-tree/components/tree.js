import './tree.scss'
import {isEmpty} from 'src/util';

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
      treeBus.$emit('update', node, this.parent);
    },
    remove: function(node) {
      treeBus.$emit('remove', node, this.parent);
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
  methods: {
    enhanceNode: function(node) {

      let oldNode = treeBus.oldFlattenedData.find(oldNode => oldNode.id === node.id);

      node.$hasChildren = function () {
        return !isEmpty(node.children)
      };

      node.$expand = oldNode && oldNode.$expand ||  false;

      node.$toggleExpand = function(expand) {
        this.$expand = isEmpty(expand) ? !this.$expand : expand;
      };

      if (!node.$hasChildren()) return;

      node.children.map(subNode => {
        subNode.$parent = node;
        this.enhanceNode(subNode);
      })
    },
    flattenNode: function(node, flattenedData = []) {
      flattenedData.push(node);
      if (!node.children) return flattenedData;
      node.children.map(subNode => {
        this.flattenNode(subNode, flattenedData)
      });

      return flattenedData;

    }
  },
  computed: {
    root: function() {
      return {$root: true, children: this.data};
    },
    nodes: function() {
      this.enhanceNode(this.root);
      return this.data;
    }
  },
  components: {
    treeNodes
  },
  created: function() {

    treeBus.oldFlattenedData = this.flattenNode(this.root);

    treeBus.$on('add', (parent) => {
      this.$emit('add', parent);
    });
    treeBus.$on('update', (node, parent) => {
      this.$emit('update', node, parent);
    });
    treeBus.$on('remove', (node, parent) => {
      this.$emit('remove', node, parent);
    });
  },
  beforeUpdate: function () {
    treeBus.oldFlattenedData = this.flattenNode(this.root);
  }
});