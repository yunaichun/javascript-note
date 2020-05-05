function* gen1(next) {
  yield 'gen1';
  yield* next;
  yield 'gen1-end';
}
function* gen2(next) {
  yield 'gen2';
  yield* next;
  yield 'gen2-end';
}
function* gen3(next) {
  yield 'gen3';
  yield* next;
  yield 'gen3-end';
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
      // == 函数内部调用函数
      // == next 为第一个 Generator 函数，里面传入第二个 Generator 函数
      next = middleware[i].call(this, next);
    }

    // == 从第一个中间件开始执行
    // == yield* 用来在一个 Generator 函数里面执行另一个 Generator 函数
    return yield* next;
  }
}
