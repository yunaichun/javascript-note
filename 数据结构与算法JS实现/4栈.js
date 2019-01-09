/**
* [Stack 栈：先进后出]
*/
function Stack(){
  this.items = [];
}
Stack.prototype = {
  constructor:Stack,
  // 入栈
  push:function(element){
    this.items.push(element);
  },
  // 出栈
  pop:function(){
    return this.items.pop();
  },
  // 获取栈顶元素
  peek:function(){
    return this.items[this.items.length - 1];
  },
  // 栈是否为空
  isEmpty:function(){
    return this.items.length == 0;
  },
  // 清空栈
  clear:function(){
    this.items = [];
  },
  // 栈的长度
  size:function(){
    return this.items.length;
  },
  print:function(){
    console.log(this.items.toString());
  }
}

var s = new Stack();
s.push('11');
s.push('22');
s.push('33');
