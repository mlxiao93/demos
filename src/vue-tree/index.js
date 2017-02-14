import './components/tree'
import {isEmpty} from 'src/util'
import TreeData from './tree-data'

let treeData = new TreeData();
// treeData.add({name: 'hello'});
// treeData.reset();
// treeData.update({id: 1, name: '1'});
// treeData.remove({id: 12});

new Vue({
  el: '#app',
  data() {
    return {
      data: treeData.all()
    }
  },
  methods: {
    addTreeNode: function(parent) {
      let name = prompt('Enter a name');
      if (isEmpty(name)) return;
      treeData.add({name}, parent);
      this.data = treeData.all();
    },
    updateTreeNode: function (node) {
      let name = prompt('Enter a name', node.name);
      if (isEmpty(name)) return;
      node.name = name;
      treeData.update(node);
      this.data = treeData.all();
    },
    removeTreeNode: function (node) {
      treeData.remove(node);
      this.data = treeData.all();
    },
    removeCheckedTreeNodes: function (nodeIds) {
      treeData.removeChecked(nodeIds);
      this.data = treeData.all();
    }
  }
});