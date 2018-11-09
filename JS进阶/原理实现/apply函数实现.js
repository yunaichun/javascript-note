/**
 * [fakeApply apply方法模拟实现]
 * @param  {[Object]} context [context对象]
 * @param  {[Array]} arr      [数组参数]
 * @return {[type]}           [context对象调用执行此函数，返回此函数的执行结果]
 */
Function.prototype.fakeApply = function (context, arr) {
    context = context || window;
    context.fn = this;

    let result;
    if (!arr) {
        result = context.fn();
    } else {
        let args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }
    delete context.fn
    return result;
}



let value = 2;
let obj = {
    value: 1
}
function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}
// 测试一：传入null
bar.fakeApply(null); // 2

// 测试二：有返回值
console.log(bar.fakeApply(obj, ['kevin', 18]));
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }