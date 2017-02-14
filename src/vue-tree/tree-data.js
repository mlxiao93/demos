const INIT_DATA = [
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

function findNode(id, data) {
  let _data = data;
  if (Array.isArray(data)) _data = {children: data};
  if (_data.id == id) return _data;
  if (_data.children) {
    for (let child of _data.children) {
      let node = findNode(id, child);
      if (node) return node;
    }
  }
  return false;
}

function removeNode(id, data) {
  let _data = data;
  if (Array.isArray(data)) _data = {children: data};
  if (!_data.children) return;
  let index = _data.children.findIndex(child => child.id == id);
  if (index >= 0) {
    _data.children.splice(index, 1);
    return;
  }
  _data.children.map(child => removeNode(id, child));
}

export default class TreeData {
  key = '';
  data = [];
  constructor(key = 'MLX_DEMOS_TREE_DATA') {
    this.key = key;
    if (!localStorage.getItem(this.key)) {
      localStorage.setItem(this.key, JSON.stringify(INIT_DATA));
    }
    this.data = JSON.parse(localStorage.getItem(this.key));
  }
  _async() {    //将data同步到localStorage
    localStorage.setItem(this.key, JSON.stringify(this.data, (key, val) => {
      if (/^\$/.test(key)) return undefined;
      return val;
    }));
    this.data = JSON.parse(localStorage.getItem(this.key));
  }
  reset() {
    this.data = INIT_DATA;
    this._async();
  }
  add(node, parent) {
    if (!node) return;
    node.id = Date.now();
    let _parent = parent;
    if (parent) {
      _parent = findNode(parent.id, this.data);
      if (!_parent) return console.error('parent node does not exists');
    }
    _parent = _parent || {children: this.data};
    _parent.children = _parent.children || [];
    _parent.children.push(node);
    this._async();
  }
  update(node) {
    if (!node) return;
    let _node = findNode(node.id, this.data);
    // _node = {...node};
    for (let key in node) {
      _node[key] = node[key];
    }
    this._async();
  }
  remove(node) {
    if (!node) return;
    removeNode(node.id, this.data);
    this._async();
  }
  removeChecked(nodeIds) {
    console.log(nodeIds);
    if(!Array.isArray(nodeIds) || nodeIds.length <= 0) return;
    nodeIds.map(id => removeNode(id, this.data));
    this._async();
  }
  all() {
    return JSON.parse(JSON.stringify(this.data));
  }

}

