function Node(data = null, left = null, right = null) {
  this.data = data;
  this.left = left;
  this.right = right;
  this.toString = function () {
    return this.data;
  };
}

function BST() {
  this.head = new Node();
}

BST.prototype.insert = function (sourceNode) {
  let first = this.head;
  if (first.data === null && first.left === null && first.right === null) {
    this.head = sourceNode;
  } else {
    while (true) {
      console.log(123, sourceNode.data, first.data);
      if (sourceNode.data > first.data) {
        /** 右节点 */
        if (first.right) {
          first = first.right;
        } else {
          first.right = sourceNode;
          break;
        }
      } else {
        /** 左节点 */
        if (first.left) {
          first = first.left;
        } else {
          first.left = sourceNode;
          break;
        }
      }
    }
  }
};

/** 前序: 根 -> 左 -> 右 */
BST.prototype.preOrder = function (node) {
  if (node) {
    console.log(node.toString());
    this.preOrder(node.left);
    this.preOrder(node.right);
  }
};

/** 中序: 左 -> 根 -> 右 */
BST.prototype.inOrder = function () {
  if (node) {
    this.inOrder(node.left);
    console.log(node.toString());
    this.inOrder(node.right);
  }
};

/** 后序: 左 -> 右 -> 根 */
BST.prototype.postOrder = function () {
  if (node) {
    this.postOrder(node.left);
    this.postOrder(node.right);
    console.log(node.toString());
  }
};

/** 最大 */
BST.prototype.getMax = function () {
  let first = this.head;
  while (true) {
    if (first.right) {
      first = first.right;
    } else {
      return first.data;
    }
  }
};

/** 最小 */
BST.prototype.getMin = function () {
  let first = this.head;
  while (true) {
    if (first.left) {
      first = first.left;
    } else {
      return first.data;
    }
  }
};

var a = new Node(1);
var b = new Node(2);
var c = new Node(3);
var list = new BST();
list.insert(a);
list.insert(b);
list.insert(c);
console.log(list);
console.log(list.preOrder(list.head));
