function Node(data = null, next = null) {
  this.data = data;
  this.next = next;
}

function ListNode() {
  this.head = new Node();
}
ListNode.prototype.insertAfter = function (sourceNode, targetNode) {
  let first = this.head;
  if (first.data === null && first.next === null) {
    this.head = sourceNode;
  } else {
    sourceNode.next = targetNode.next;
    targetNode.next = sourceNode;
  }
  return first;
}
ListNode.prototype.removeNode = function (node) {
  let first = this.head;
  /** 找到 node 节点的父节点 */
  while (first.next) {
    if (first.next === node) {
      first.next = first.next.next;
      break;
    }
    first = first.next;
  }
  return first;
}

var a = new Node(1)
var b = new Node(2)
var c = new Node(3)
var list = new ListNode(a)
list.insertAfter(a)
list.insertAfter(b, a)
list.insertAfter(c, b)
list.removeNode(b)
console.log(list)
