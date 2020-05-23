class Stack {
    constructor(val = null) {
        this.val = []
    }
    // == 入栈   
    push(item){
        this.val.push(item);
    }
    // == 出栈
    pop(){
        return this.val.pop();
    }
    // == 栈顶元素
    peek(){
        return this.val[this.val.length - 1];
    }
}
