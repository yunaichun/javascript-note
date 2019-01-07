/**
 * [fakeBind bind函数模拟实现]
 * @param  {Object}       context       [context对象]
 * @return {[Function]}                 [返回函数]
 */
Function.prototype.fakeBind = function(context) {
    if (typeof this !== 'function') {
	  throw new Error('when use bind, it must be a function');
	}
    let self = this;
    // 获取fakeBind函数从第二个参数到最后一个参数
    let args = Array.prototype.slice.call(arguments, 1)
    let resultFuc = function() {
    	// 这个时候的arguments是指bind返回的函数传入的参数
        let bindArgs = Array.prototype.slice.call(arguments);
        // 1、当作为普通函数时，this 指向 context
        // 2、当作为构造函数时，this 指向 实例
        self.apply(this instanceof self ? this : context, args.concat(bindArgs));
    }
    // 1、可以判断是否是 new 的操作  2、返回函数只会继承 self 原型上的属性
    resultFuc.prototype = Object.create(self.prototype);
    return resultFuc;
}
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
/*一、测试普通函数*/
let bindFoo1 = bar.fakeBind(foo, 'daisy');
let obj1 = bindFoo1('18'); // 1 + daisy + 18
console.log(obj1.habit);// TypeError
console.log(obj1.friend);// TypeError
/*二、测试构造函数*/
let bindFoo2 = bar.fakeBind(foo, 'daisy');
let obj2 = new bindFoo2('18'); // undefined + daisy + 18
/*注意：假如为 this instanceof self 时 为 self
  则此时 obj2 会执行两个操作：
  1、执行 new   操作：继承 bar.prototype 的属性
  2、执行 apply 操作：bar.apply(bar, ['daisy', '18'])
*/
/*但是：假如为 this instanceof self 时 为 this
  则此时 obj2 会执行两个操作：
  1、执行 new   操作：继承 bar.prototype 的属性
  2、执行 apply 操作：bar.apply(obj2, ['daisy', '18'])，此时实例还会继承 bar 构造函数上的属性
*/
console.log(obj2.habit);// shopping
console.log(obj2.friend);// kevin





// 解释以下函数
var bindf = Function.prototype.call.bind(Array.prototype.slice);
bindf([1, 2, 3]);
// 分析如下：
self = Function.prototype.call
content = Array.prototype.slice
bindArgs = [].concat([1, 2, 3]);
self.apply(content, [[1,2,3]]);
// 等价于
content.call([1,2,3])
// 等价于
[1,2,3].slice();