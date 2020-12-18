/**
 * [fakeCall call方法模拟实现]
 * @param {Object} context [context对象]
 * @param {Object} args    [扩展运算符参数]
 * @return {[type]} context对象调用执行此函数，返回此函数的执行结果
 */
Function.prototype.fakeCall = function(context, ...args) {
    // == 传入 null 和 undefined均 指向 window
    context = context || window;
    context.fn = this;

    let result = context.fn(...args);
    delete context.fn;

    return result;
}

const bar = function(name, age) {
    return  {name, age};
};
const obj = { value: 1 };
// == 1、传入null
console.log(bar.fakeCall(null));
// == 2、有返回值
console.log(bar.fakeCall(obj, 'kevin', 18));


// == 应用
let arr = [' ab', ' c d'];
console.log(arr.map(Function.prototype.call, String.prototype.trim));

// == 1、map 方法: 第二个参数相当于 obj 对象调用第一个函数
var arr = [' ab', ' c d'];
var obj = { 'test': 'test' }
arr.map(function(item) {
    // == obj
    console.log(this);
}, obj);

//  == 2、以遍历到第一个元素为例
Function.prototype.call.call(String.prototype.trim, ' ab');
// == 等价于
String.prototype.trim.call(' ab');
// == 等价于
' ab'.trim();
