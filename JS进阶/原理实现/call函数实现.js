/**
 * [fakeCall call方法模拟实现]
 * @param  {Object} context            [context对象]
 * @return {[type]}                    [context对象调用执行此函数，返回此函数的执行结果]
 */
Function.prototype.fakeCall = function(context) {
	// 传入null和undefined均指向window
	context = context || window;
    context.fn = this;
    let args = [];
    for (let i = 1; i < arguments.length; i++) {
    	// args.push('arguments[' + i + ']');
    	args.push(arguments[i]);
    }
    // eval('context.fn(' + args.toString() +')');
    // ES6模拟
    let result = context.fn(...args);
    delete context.fn;
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
bar.fakeCall(null); // 2

// 测试二：有返回值
console.log(bar.fakeCall(obj, 'kevin', 18));
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }



// 解释以下函数
var arr = ['   ab', '   c    d'];
arr.map(Function.prototype.call, String.prototype.trim);
// 一、map方法第二个参数解释：相当于obj对象调用第一个函数
var arr = ['   ab', '   c    d'];
var obj = { 'test': 'test' }
arr.map(function(item) { 
    console.log(this) // obj
}, obj);
// 二、解释：相当于String.prototype.trim调用Function.prototype.call函数，传入当前item值
Function.prototype.call.call(String.prototype.trim, '   ab'); // 'ab'
// 等价于
String.prototype.trim.call('   ab'); // 'ab'