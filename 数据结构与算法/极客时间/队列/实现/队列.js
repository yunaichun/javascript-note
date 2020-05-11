class Queue {
    constructor(val = null) {
        this.val = []
    }
    // == 入队   
    enqueue(item){
        this.val.push(item);
    }
    // == 出队
    dequeue(){
        return this.val.shift();
    }
    // == 队首元素
    front(){
        return this.val[0];
    }
}
