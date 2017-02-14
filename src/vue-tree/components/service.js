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

  let lastNode = findNode(node.id, lastData);  //旧状态的还原

  node.$expand = lastNode && lastNode.$expand || false;
  node.$check = lastNode && lastNode.$check || false;

  node.$hasChildren = function () {
    return Array.isArray(node.children) && node.children.length > 0;
  };

  node.$toggleExpand = function(expand) {
    this.$expand = expand === undefined ? !this.$expand : expand;
  };

  node.$toggleCheck = function(check) {
    this.$check = check === undefined ? this.$check : check;
    if (!this.$check) {  //当前未选中
      this.$hasChildren() && this.children.map(child => child.$toggleCheck(false));   //所有子节未选中
      this.$parent && (this.$parent.$check = false);  //置父节点为未选中状态
    } else {   //当前选中
      this.$hasChildren() && this.children.map(child => child.$toggleCheck(true));    //所有子节点选中

      //查看父节点下的所有子节点是否选中，若是，则置父节点为选中状态
      if (this.$parent && this.$parent.children.every(child => child.$check)) {
        this.$parent.$check = true;
      }
    }
  };

  if (!node.$hasChildren()) return;

  node.children.map(subNode => {
    subNode.$parent = node;
    extendNode(subNode, lastData);
  });
}