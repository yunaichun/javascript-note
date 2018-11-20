/**
 * [fakeReduce 数组reduce方法模拟实现]
 * @param  {Function} fn           [函数]
 * @param  {[type]}   initialValue [description]
 * @return {[type]}                [description]
 */
Array.prototype.fakeReduce = function(fn, initialValue) {
  if (typeof fn !== 'function') {
    throw new Error('argument[0] must be a function');
  }
  // 数组实例
  let initialArr = this;
  // 数组实例拷贝：存在第二个参数
  let arr = initialArr.slice();
  initialValue && arr.unshift(initialValue);
  let next;
  // arr 只要为 1 项的时候就结束循环
  while (arr.length > 1) {
    let prev = arr[0];
    let curr = arr[1];
    // index 索引的更新
    let index = initialArr.length - arr.length + 1;
    // 执行 fn 获取的值为 next ，将其插入 arr 数组中，同时去除前两项
    next = fn.call(null, prev, curr, index, initialArr);
    // arr 前两项的值换取一个新值 next，不断的归并
    arr.splice(0, 2, next);
  }
  return next;
};

let arr = [1, 2, 3, 4, 5];
let sum = arr.fakeReduce((prev, cur, index, arr) => {
  console.log(prev, cur, index, arr);
  return prev * cur;
}, 100);
console.log(sum);
// 100 1 0 (5) [1, 2, 3, 4, 5]
// 100 2 1 (5) [1, 2, 3, 4, 5]
// 200 3 2 (5) [1, 2, 3, 4, 5]
// 600 4 3 (5) [1, 2, 3, 4, 5]
// 2400 5 4 (5) [1, 2, 3, 4, 5]
// 12000




/**
 * dncFib 归并思想实现斐波那契数列
 * @return {[yield]}    [返回yield之后的值]
 */
function* dncFib() {
  let prev = 1;
  let curr = 1;
  while(true) {
    // 每次暂停获取当前值
    yield prev;
    [prev, curr] = [curr, prev + curr];
  }
}
// 法一：通过for循环遍历generator函数（Generator 函数原生具有 Iterator 接口）
let generator = dncFib();
for (let i = 0; i < 5; i++) {
  console.log(generator.next().value);
}

// 法二：通过变量结构（只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值）
let [a, b, c] = generator();