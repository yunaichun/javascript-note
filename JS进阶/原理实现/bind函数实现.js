/**
 * [fakeBind bind函数模拟实现]
 * @param {Object} context [context对象]
 * @return {[Function]} [返回函数]
 */
Function.prototype.fakeBind = function(context) {
    if (typeof this !== 'function') {  
        throw new Error('when use bind, it must be a function');
    }

    let self = this;

    // == 获取 fakeBind 函数从第二个参数到最后一个参数
    let args = Array.prototype.slice.call(arguments, 1)
    let resultFuc = function() {
        // == 这个时候的 arguments 是指 bind 返回的函数传入的参数
        let bindArgs = Array.prototype.slice.call(arguments);
        // == 1、当作为普通函数时，this 指向 context
        // == 2、当作为构造函数时，this 指向 实例
        self.apply(
            this instanceof self ? 
            this : // == 将 this 往 self 上靠
            context, 
            args.concat(bindArgs)
        );
    }

    // == 1、可以判断是否是 new 的操作 
    // == 2、返回函数只会继承 self 原型上的属性
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
bar.prototype.friend =  'kevin';


// == 一、测试普通函数
let bindFoo1 = bar.fakeBind(foo, 'daisy');
let obj1 = bindFoo1('18'); // == 1 + daisy + 18
// == bindFoo1 为一个函数， 执行不会有任何返回
console.log(obj1.habit); // == 不会有任何返回：TypeError
console.log(obj1.friend); // == 不会有任何返回：TypeError


// == 二、测试构造函数
let bindFoo2 = bar.fakeBind(foo, 'daisy');
let obj2 = new bindFoo2('18'); // == undefined + daisy + 18
console.log(obj2.habit); // == 返回 bar 实例：shopping
console.log(obj2.friend); // == 返回 bar 实例：kevin




// == 应用一
let bindf = Function.prototype.call.bind(Array.prototype.slice);
bindf([1, 2, 3]);
Function.prototype.call.apply(Array.prototype.slice, [1, 2, 3])
Array.prototype.slice.apply([1, 2, 3])
[1, 2, 3].slice()


// == 应用二
let x = 10;
let y = function() {
    console.log(this.x);
};
let obj1 = { x: 100 };
let obj2 = { x: 2 };
let obj3 = { x: 3 };
func = y.fakeBind(obj1).fakeBind(obj2).fakeBind(obj3);
// 最终结果: y.apply(obj1)  结果为 100
func();
