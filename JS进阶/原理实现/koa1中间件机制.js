function* gen1(next) {
  yield 'gen1';
  yield* next; // 开始执行下一个中间件
  yield 'gen1-end'; // 下一个中间件执行完成再继续执行gen1中间件的逻辑
}
function* gen2(next) {
  yield 'gen2';
  yield* next; // 开始执行下一个中间件
  yield 'gen2-end'; // 下一个中间件执行完成再继续执行gen2中间件的逻辑
}
function* gen3(next) {
  yield 'gen3';
  yield* next; // 开始执行下一个中间件
  yield 'gen3-end'; // 下一个中间件执行完成再继续执行gen3中间件的逻辑
}


let middleware = [gen1, gen2, gen3];
let len = middleware.length;
// 遍历器对象：提供给最后一个中间件的参数
let next = (function* noop() {})();
while(len--) {
  // gen3 执行的结果（遍历器对象）作为 gen2 的 next -> gen2 执行的结果（遍历器对象）作为 gen1 的 next -> gen1
  next = middleware[len].call(null, next);
}

function* run(next) {
  yield* next;
}
let g = run(next);


g.next(); // {value: "gen1", done: false}
g.next(); // {value: "gen2", done: false}
g.next(); // {value: "gen3", done: false}
g.next(); // {value: "gen3-end", done: false}
g.next(); // {value: "gen2-end", done: false}
g.next(); // {value: "gen1-end", done: false}
g.next(); // {value: undefined, done: true}




/**
 * [compose koa中间件执行机制]
 * @param  {[type]} middleware [中间件数组]
 * @return {[type]}            [description]
 */
function compose(middleware) {
  return function* (next) {
    // 遍历器对象：提供给最后一个中间件的参数
    if (!next) next = (function* noop() {})();
    let i = middleware.length;
    // 从后往前开始执行 middleware 中的 generator 函数
    while(i--) {
      // 后一个中间件 执行的结果（遍历器对象）作为 前一个中间件的执行时的第一个参数
      next = middleware[i].call(this, next);
    }
    // 最终 next 是融合所有中间件的遍历器对象
    return yield* next;
  }
}
