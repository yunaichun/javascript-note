class Node {
    constructor(val = null, next = null) {
        this.val = val
        this.next = next
    }
}

class ListNode {
    constructor() {
        this.head = new Node();
    }

    insertAfter(sourceNode, targetNode) {
        if (this.head.val === null && this.head.next === null) {
            this.head = sourceNode
        } else {
            sourceNode.next = targetNode.next
            targetNode.next = sourceNode
        }
        return this.head
    }
    
    removeNode(node) {
        let first = this.head;
        while(first.next) {
            if (first.next === node) {
                first.next = first.next.next
                break
            }
            first = first.next
        }
        return this.head
    }
}

let a = new Node(1)
let b = new Node(2)
let c = new Node(3)
let list = new ListNode(a)
list.insertAfter(a)
list.insertAfter(b, a)
list.insertAfter(c, b)
list.removeNode(b)
console.log(list)
