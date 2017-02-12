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
  _update() {
    localStorage.setItem(this.key, JSON.stringify(this.data));
    this.data = JSON.parse(localStorage.getItem(this.key));
  }
  reset() {
    this.data = INIT_DATA;
    this._update();
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
    this._update();
  }

}

