function findNode(id, data) {
  if (!data) return false;
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

export function extendNode (node, lastData) {

  let lastNode = findNode(node.id, lastData);

  node.$expand = lastNode && lastNode.$expand || false;   //旧状态的还原

  node.$hasChildren = function () {
    return Array.isArray(node.children) && node.children.length > 0;
  };

  node.$toggleExpand = function(expand) {
    this.$expand = expand === undefined ? !this.$expand : expand;
  };

  if (!node.$hasChildren()) return;

  node.children.map(subNode => {
    subNode.$parent = node;
    extendNode(subNode, lastData);
  });
}