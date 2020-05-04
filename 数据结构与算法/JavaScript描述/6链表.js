/**
* [Node 链表节点：存储数据和下一个节点]
*/
function Node(data, next) {
    this.data = data; // 此节点对应的数据
    this.next = next; // 指向下一个节点的连接 ，每次创建默认都为null，初始也为null
}

// 定义链表操作的方法
function Llist() {
    this.head = new Node(null, null); // 保存链表的头节点
}
/**
* [insertAfter 将待插入的数据插入到目标节点数据的后面]
* @param  {[type]} sourceData     [待插入的数据]
* @param  {[type]} targetData     [目标节点数据]
* @return {[type]}                [description]
*/
Llist.prototype.insertAfter = function(sourceData, targetData) {
    var sourceNode = new Node(sourceData, null);
    var targetNode = this.head;
    if (targetNode.data === null) {
        this.head.data = sourceNode.data;
    } else {
        while (true) {
            if (targetNode.data !== targetData) {
                targetNode = targetNode.next;
            } else {
                break;
            }
        }
        // 两者顺序不能颠倒了
        sourceNode.next = targetNode.next;
        targetNode.next = sourceNode;
    }
}
/**
* [remove 移除链表上指定数据的节点]
* @param  {[type]} targetData [待移除的节点的数据]
* @return {[type]}            [description]
*/
Llist.prototype.remove = function(targetData) {
    var targetNode = this.head;
    while (true) {
        if (targetNode.next.data !== targetData) {
            targetNode = targetNode.next;
        } else {
            break;
        }
    }
    targetNode.next = targetNode.next.next;
}
// 测试
var list = new Llist();
list.insertAfter(1);
list.insertAfter(2, 1);
list.insertAfter(3, 1);
list.remove(3);

/*  数据结构：
    Llist {
        head: Node {
            data: 1,
            next: Node {
                data: 3,
                next: Node {
                    data: 2,
                    next: null
                }
            }
        }
    }
*/