/**
* [Queue 队列：先进先出]
*/
function Queue(){
  this.items = [];
}
Queue.prototype = {
  constructor:Queue,
  // 入队
  enqueue:function(elements){
    this.items.push(elements);
  },
  // 出队
  dequeue:function(){
    return this.items.shift();
  },
  // 队首元素
  front:function(){
    return this.items[0];
  },
  // 队是否为空
  isEmpty:function(){
    return this.items.length == 0;
  },
  // 队长度
  size:function(){
    return this.items.length;
  },
  // 清空队
  clear:function(){
    this.items = [];
  },
  print:function(){
    console.log(this.items.toString());
  }
}

var queue = new Queue();
queue.enqueue('11');
queue.enqueue('22');
queue.enqueue('33');
