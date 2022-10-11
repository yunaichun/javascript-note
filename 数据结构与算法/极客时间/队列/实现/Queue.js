/**
 * 先进先出
 */
function Queue() {
  this.queue = [];
}
Queue.prototype.enqueue = function (item) {
  this.queue.push(item);
}
Queue.prototype.dequeue = function () {
  return this.queue.shift();
}
Queue.prototype.front = function (item) {
  return this.queue[0];
}
