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