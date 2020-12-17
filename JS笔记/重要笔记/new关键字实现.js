// == 1、new 原理
function fakeNew(object) {
    // == 1. 创建对象，同时设置该对象的 __proto__ 属性
    let obj = Object.create(object.prototype);
    // == 等价于
	// == let obj = {};
	// == obj.__proto__ = object.prototype;
    
    // == 2、执行构造函数中的代码（为这个对象添加属性和方法）
    let k = object.call(obj);
    // == 3、返回对象
	if (typeof k === 'object') {
		return k;
    }
    return obj;
}

let M = function(name) {
	this.name = name;
}
let obj = fakeNew(M);

console.log(obj instanceof M);


// == 2、instanceof 原理
const A = function() {}
const a = new A();

// == a instanceof A 等价于 a.__proto__ === A.prototype
console.log(a instanceof A);
console.log(a.__proto__ === A.prototype);
console.log(A.prototype.__proto__ === Object.prototype);

// == 判断实例是哪个构造函数实例的：
console.log(a.constructor === A);


// == 3、Object.create 与 new 的区别
const a = { x: 1 };
const b = new Object(a);
const c = Object.create(a);
console.log(b.__proto__ === Object.prototype);
console.log(c.__proto__ === a);
