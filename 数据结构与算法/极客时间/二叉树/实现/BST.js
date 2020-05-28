function Node(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = function() {
        return this.data
    };
}

// == 二叉搜索树默认是中序排序：左 -> 根 -> 右
class BST {
    constructor() {
        this.head = new Node();
    }
    // == 插入
    insert(sourceNode) {
        let first = this.head;
        if (first.data === null && first.left === null && first.right === null) {
            this.head = sourceNode;
        } else {
            while (true) {
                if (sourceNode.data < first.data) {
                    if (first.left === null) {
                        first.left = sourceNode;
                        break;
                    } else {
                        first = first.left;
                    }
                } else {
                    if (first.right === null) {
                        first.right = sourceNode;
                        break;
                    } else {
                        first = first.right;
                    }
                }
            }
        }
    }
    // == 前序：根 -> 左 -> 右
    preOrder(node) {
        if (node) {
            console.log(node.show() + '');
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }
    // == 中序：左 -> 根 -> 右
    inOrder(node) {
        if (node) {
            this.inOrder(node.left);
            console.log(node.show() + '');
            this.inOrder(node.right);
        }
    }
    // == 后序：左 -> 右 -> 根
    postOrder(node) {
        if (node) {
            this.postOrder(node.left);
            this.postOrder(node.right);
            console.log(node.show() + '');
        }
    }
    getMin() {
        let first = this.head;
        while (first.left) {
            first = first.left
        }
        return first;
    }
    getMax() {
        let first = this.head;
        while (first.right) {
            first = first.right
        }
        return first;
    }
}

let a = new Node(1)
let b = new Node(2)
let c = new Node(3)
let list = new BST()
list.insert(a)
list.insert(b)
list.insert(c)
console.log(list)
console.log(list.preOrder(list.head))
