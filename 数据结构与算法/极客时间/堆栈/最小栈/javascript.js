/** https://leetcode.cn/problems/min-stack/ */

var MinStack = function () {
  this.stack = [];
  this.min_stack = [];
};

MinStack.prototype.push = function (x) {
  this.stack.push(x);
  const len = this.min_stack.length;
  const min = !len ? x : Math.min(this.min_stack[len - 1], x);
  this.min_stack.push(min);
};

MinStack.prototype.pop = function () {
  this.stack.pop();
  this.min_stack.pop();
};

MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
  return this.min_stack[this.min_stack.length - 1];
};
