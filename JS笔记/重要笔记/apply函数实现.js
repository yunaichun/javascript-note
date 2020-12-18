/**
 * [fakeApply apply方法模拟实现]
 * @param {[Object]} context [context对象]
 * @param {[Array]}  arr     [数组参数]
 * @return {[type]}  context对象调用执行此函数，返回此函数的执行结果
 */
Function.prototype.fakeApply = function (context, arr) {
    // == 传入 null 和 undefined均 指向 window
    context = context || window;
    context.fn = this;

    result = context.fn(...arr);
    delete context.fn;

    return result;
}

const bar = function(name, age) {
    return  {name, age};
};
const obj = { value: 1 };
// == 1、传入null
console.log(bar.fakeApply(null));
// == 2、有返回值
console.log(bar.fakeApply(obj, ['kevin', 18]));
