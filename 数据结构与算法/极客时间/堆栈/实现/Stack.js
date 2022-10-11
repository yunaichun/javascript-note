/**
 * 先进后出
 */
function Stack() {
  this.stack = [];
}
Stack.prototype.push = function (item) {
  this.stack.push(item);
}
Stack.prototype.pop = function () {
  return this.stack.pop();
}
Stack.prototype.peek = function () {
  return this.stack[this.stack.length - 1];
}
