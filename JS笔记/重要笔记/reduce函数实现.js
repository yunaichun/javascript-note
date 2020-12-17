/**
 * [fakeReduce 数组reduce方法模拟实现]
 * @param {Function} fn [函数]
 * @param {[type]} initialValue [description]
 * @return {[type]} [description]
 */
Array.prototype.fakeReduce = function(fn, initialValue) {
    if (typeof fn !== 'function') { 
        throw new Error('argument[0] must be a function');
    }
    let initialArr = this;
    let arr = initialArr.slice();

    initialValue && arr.unshift(initialValue);

    let next;
    while (arr.length > 1) {
        let prev = arr[0];
        let curr = arr[1];
        let index = initialArr.length - arr.length + 1;
        next = fn.call(null, prev, curr, index, initialArr);
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
// == 100  1  0  [1, 2, 3, 4, 5]
// == 100  2  1  [1, 2, 3, 4, 5]
// == 200  3  2  [1, 2, 3, 4, 5]
// == 600  4  3  [1, 2, 3, 4, 5]
// == 2400 5  4  [1, 2, 3, 4, 5]
// == 12000




/**
 * dncFib 归并思想实现斐波那契数列
 * @return {[yield]}    [返回yield之后的值]
 */
function* dncFib() {
    let prev = 1;
    let curr = 1;
    while(true) {
        yield prev;
        [prev, curr] = [curr, prev + curr];
    }
}
