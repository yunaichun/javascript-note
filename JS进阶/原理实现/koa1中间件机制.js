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
let next = (function* noop() {})();

while(len--) {
  // == next 为 gen1 函数，里面传入 gen2
  next = middleware[len].call(null, next);
}

function* run(next) {
  // == yield* 用来在一个 Generator 函数里面执行另一个 Generator 函数
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
    if (!next) next = (function* noop() {})();
    let i = middleware.length;

    while(i--) {
      // == next 为第一个 Generator 函数，里面传入第一个 Generator 函数
      next = middleware[i].call(this, next);
    }

    // == yield* 用来在一个 Generator 函数里面执行另一个 Generator 函数
    return yield* next;
  }
}
