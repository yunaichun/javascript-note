class MyQueue {
    constructor() {
        this.stack1 =[]
        this.stack2 =[]
    }
    // == 入队
    enqueue(x) {
        // ==  堆栈 1 正常入队
        this.stack1.append(x)
        // ==  堆栈 2 值为反转堆栈 1
        // == 不改变原数组反转数组：https://juejin.im/post/5d7658e1518825168d37dd9e
        this.stack2 = this.stack1.slice().reverse()
    }
    // == 出队
    dequeue() {
        // ==  堆栈 2 出栈
        let i = this.stack2.pop()
        // ==  堆栈 1 值为反转堆栈 2
        this.stack1 = [...this.stack2].reverse()
        return i
    }
    // == 队首元素
    front() {
        return this.stack1[0]
    }
    empty(this) {
        if (this.stack1.length == 0) {
            return true
        } 
        return false
    }     
}

