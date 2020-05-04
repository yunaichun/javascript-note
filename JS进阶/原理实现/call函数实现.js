/**
 * [fakeCall call方法模拟实现]
 * @param {Object} context [context对象]
 * @return {[type]} [context对象调用执行此函数，返回此函数的执行结果]
 */
Function.prototype.fakeCall = function(context) {

    // == 传入 null 和 undefined均 指向 window
    context = context || window;
    context.fn = this;

    let args = [];
    for (let i = 1; i < arguments.length; i++) {
        // == args.push('arguments[' + i + ']');    
        args.push(arguments[i]);
    }

    // == eval('context.fn(' + args.toString() +')');
    // == ES6 模拟
    let result = context.fn(...args);
    delete context.fn;

    return result;

}

let value = 2;
let obj = { value: 1 }
function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,    
        name: name,
        age: age
    };
}
// == 测试一：传入null
bar.fakeCall(null); // == undefined
console.log(bar.fakeCall(null));
// Object {
//     value: undefined,   
//     name: undefined,   
//     age: undefined
// }

// == 测试二：有返回值
bar.fakeCall(obj, 'kevin', 18) // == 1
console.log(bar.fakeCall(obj, 'kevin', 18));
// Object {
//     value: 1,
//     name: 'kevin',
//     age: 18   
// }




// == 应用
var arr = [' ab', ' c d'];
arr.map(Function.prototype.call, String.prototype.trim);

// == 一、map方法
// == 第二个参数相当于 obj 对象调用第一个函数
var arr = [' ab', ' c d'];
var obj = { 'test': 'test' }
arr.map(function(item) {
    // == obj
    console.log(this) 
}, obj);

// === 二、解释：
// == 相当于 String.prototype.trim 
// == 调用 Function.prototype.call 函数
// == 传入当前item值
Function.prototype.call.call(String.prototype.trim, ' ab'); 
// == 等价于
String.prototype.trim.call(' ab');
