/**
* [Node 二叉树节点：存储数据和左右节点]
*/
function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = function() {
        return this.data
    };
}

//定义二叉树
function BST() {
    this.head = new Node(null, null, null);
}
/**
* [insert 将新数据节点插入到二叉树指定位置]
* @param  {[type]} newData         [待插入的新数据]
* @param  {[type]} prevData        [新数据节点之前的节点对应的数据]
* @return {[type]}                 [description]
*/
BST.prototype.insert = function(sourceData) {
    var sourceNode = new Node(sourceData, null, null);
    var targetNode = this.head;
    // 存入头节点的值：相当于基准值
    if (targetNode.data === null) {
    	targetNode.data = sourceNode.data;
    } else {
	    while (true) {
	        if (sourceData < targetNode.data) {
	        	if (targetNode.left === null) {
	        		targetNode.left = sourceNode;
	        		break;
	        	} else {
	        		targetNode = targetNode.left;
	        	}
	        } else {
	            if (targetNode.right === null) {
	            	targetNode.right = sourceNode;
	        		break;
	        	} else {
	        		targetNode = targetNode.right;
	        	}
	        }
	    }
    }
}
/**
* [inOrder 中序：左 -> 根 -> 右]
* @param  {[type]} node [二叉树某一节点：可以传入跟节点this.root]
* @return {[type]}      [description]
*/
BST.prototype.inOrder = function(node) {
    if (node !== null) {
        inOrder(node.left);
        console.log(node.show() + ' ');
        inOrder(node.right);
    }
}
/**
* [preOrder 先序：根 -> 左 -> 右]
* @param  {[type]} node [二叉树某一节点：可以传入跟节点this.root]
* @return {[type]}      [description]
*/
BST.prototype.preOrder = function(node) {
    if (node !== null) {
        console.log(node.show() + ' ');
        preOrder(node.left);
        preOrder(node.right);
    }
}
/**
* [postOrder 后序：左 -> 右 -> 根]
* @param  {[type]} node [二叉树某一节点：可以传入跟节点this.root]
* @return {[type]}      [description]
*/
BST.prototype.postOrder = function(node) {
    if (node !== null){
        postOrder(node.left);
        postOrder(node.right);
        console.log(node.show() + ' ');
    }
}
/**
* [getMin 获取最小值]
* @return {[type]} [description]
*/
BST.prototype.getMin = function() {
    var currNode = this.root;
    while (currNode.left !== null) {
        currNode = cerrent.left;
    }
    return currNode.data;
}
/**
* [getMax 获取最大值]
* @return {[type]} [description]
*/
BST.prototype.getMax = function() {
    var currNode = this.root;
    while (currNode.right !== null) {
        currNode = currNode.right;
    }
    return currNode.data;
}

var bst = new BST();
bst.insert(11);
bst.insert(10);
bst.insert(12);
/*  数据结构：
    BST {
        head: Node {
            data: 11,
            left: Node {
                data: 10,
                left: null,
                right: null
            },
            right: Node {
                data: 12,
                left: null,
                right: null
            }
        }
    }
*/