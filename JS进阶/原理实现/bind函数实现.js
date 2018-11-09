/**
 * [fakeBind bind函数模拟实现]
 * @param  {Object}       context       [context对象]
 * @return {[Function]}                 [返回函数]
 */
Function.prototype.fakeBind = function (context) {
    if (typeof this !== 'function') {
	  throw new Error('when use bind, it must be a function');
	}
    let self = this;
    // 获取fakeBind函数从第二个参数到最后一个参数
    let args = Array.prototype.slice.call(arguments, 1)
    let result = function () {
    	// 这个时候的arguments是指bind返回的函数传入的参数
        let bindArgs = Array.prototype.slice.call(arguments);
        // 1、当作为普通函数时，this 指向 window，self 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。（content为null或undefined均指向window）
        // 2、当作为构造函数时，this 指向实例，self 指向绑定函数，此时结果为 true，（因为下面一句 `result.prototype = this.prototype;`），this 指向实例
        self.apply(this instanceof self ? this : context, args.concat(bindArgs));
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数的原型中的值
    result.prototype = Object.create(this.prototype);
    return result;
}




let value = 2;
let foo = {
    value: 1
};
function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}
bar.prototype.friend = 'kevin';


let bindFoo = bar.bind(foo, 'daisy');
let obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin