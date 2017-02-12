import './components/tree'
import {isEmpty} from 'src/util'
import TreeData from './tree-data'

let treeData = new TreeData();
// treeData.add({name: 'hello'}, {id: 1});
treeData.reset();

let DATA = [
  {
    id: 1,
    name: 1,
    children: [
      {
        id: 11,
        name: 11,
      },
      {
        id: 12,
        name: 12
      }
    ]
  },
  {
    id: 2,
    name: 2,
    children: [
      {
        id: 21,
        name: 21
      },
      {
        id: 22,
        name: 22
      }
    ]
  }
];

new Vue({
  el: '#app',
  data() {
    return {
      data: DATA
    }
  },
  methods: {
    _refreshData: function() {
      DATA = JSON.parse(JSON.stringify(DATA, (key, value) => {
        if (/^\$/.test(key)) return undefined;
        return value;
      }));
      this.data = DATA;
    },
    addTreeNode: function(parent) {
      let name = prompt('Enter a name');
      if (isEmpty(name)) return;
      parent.children = parent.children || [];
      parent.children.push({
        id: Date.now(),
        name
      });
      this._refreshData();
    },
    updateTreeNode: function (node, parent) {
      let name = prompt('Enter a name', node.name);
      if (isEmpty(name)) return;
      node.name = name;
      this._refreshData();
    },
    removeTreeNode: function (node, parent) {
      let children = parent.children;
      children.splice(children.findIndex(obj => obj.id === node.id), 1);
      this._refreshData();
    }
  }
});