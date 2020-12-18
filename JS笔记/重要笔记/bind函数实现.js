/**
 * [fakeBind bind函数模拟实现]
 * @param {Object} context [context对象]
 * @return {[Function]} 返回函数
 */
Function.prototype.fakeBind = function(context, ...args) {
    if (typeof this !== 'function') {  
        throw new Error('when use bind, it must be a function');
    }

    let self = this;

    let resultFuc = function(...args2) {
        const current = this instanceof self ? this : context;
        self.apply(current, args.concat(args2));
    }

    // == 可以判断是否是 new 的操作；同时返回函数会继承 self 原型上的属性
    resultFuc.prototype = Object.create(self.prototype);
    return resultFuc;
}

let foo = { value: 1 };
function bar(name, age) {
    console.log(this.value);
    this.name = name;
    this.age = age;
}
bar.prototype.friend = 'friend';
// == 1、普通函数: bar.apply(foo, ['name1', 10])
let bind1 = bar.fakeBind(foo, 'name1');
let obj1 = bind1(10);
// == 2、构造函数: bar.apply(bind2, ['name1', 10])
let bind2 = bar.fakeBind(foo, 'daisy');
let obj2 = new bind2('name2');


// == bind 函数示例一
let bindf = Function.prototype.call.bind(Array.prototype.slice);
bindf([1, 2, 3]);
// == 等价于
Function.prototype.call.apply(Array.prototype.slice, [1, 2, 3])
// == 等价于
Array.prototype.slice.call([1, 2, 3])
// == 等价于
[1, 2, 3].slice()


// == bind 函数示例二
let x = 10;
let y = function() {
    console.log(this.x);
};
let obj1 = { x: 100 };
let obj2 = { x: 2 };
let obj3 = { x: 3 };
func = y.bind(obj1).bind(obj2).bind(obj3);
func();
// == 等价于
(y.bind(obj1).bind(obj2)).apply(obj3);
// == 等价于
((y.bind(obj1)).apply(obj2)).apply(obj3);
// == 等价于
((y.apply(obj1)).apply(obj2)).apply(obj3);
