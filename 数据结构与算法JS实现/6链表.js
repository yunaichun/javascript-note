/**
* [Node 链表节点：存储数据和下一个节点]
*/
function Node(data, next) {
       this.data = data; // 此节点对应的数据
       this.next = next; // 指向下一个节点的连接 ，每次创建默认都为null，初始也为null
}

// 定义链表操作的方法
function Llist() {
    this.head = new Node('head', null); // 保存链表的头节点
}
/**
* [find 查询某数据所属的节点]
* @param  {[type]} data [待查询的数据]
* @return {[type]}      [返回此数据对应的节点]
*/
Llist.prototype.find = function(data) {
     var currNode = this.head;
     while (currNode.data !== data) {
         currNode = currNode.next;
     }
     return currNode;
}
/**
* [insert 将新数据节点插入到指定数据节点的后面]
* @param  {[type]} newData         [待插入的新数据]
* @param  {[type]} prevData        [新数据节点之前的节点对应的数据]
* @return {[type]}                 [description]
*/
Llist.prototype.insert = function(newData, prevData) {
     var newNode = new Node(newData, null);
     var prevNode = this.find(prevData);
     // 两者顺序不能颠倒了
     newNode.next = prevNode.next;
     prevNode.next = newNode;
}
/**
* [findPrevious 查询某数据所属的节点对应的前一个节点]
* @param  {[type]} data [待查询的数据]
* @return {[type]}      [返回此数据对应的节点的前一个节点]
*/
Llist.prototype.findPrevious = function(data) {
     var prevNode = this.head;
     while ((prevNode.next !== null) && (prevNode.next.data !== data)) {
         prevNode = prevNode.next;
     }
     return prevNode;
}
/**
* [remove description]
* @param  {[type]} data [待插入的新数据]
* @return {[type]}      [description]
*/
Llist.prototype.remove = function(data) {
    var prevNode = this.findPrevious(data);
    if (prevNode.next !== null) {
        prevNode.next = prevNode.next.next;
    }
}
Llist.prototype.display = function() {
    var currNode = this.head;
    while (currNode.next !== null) {
      console.log(currNode.next.data);
      currNode = currNode.next;
    }
}
// 测试
var list = new Llist();
list.insert(1, 'head');
list.insert(2, 1);
list.insert(3, 1);
