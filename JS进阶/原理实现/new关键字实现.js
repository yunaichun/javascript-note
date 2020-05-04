/**
 * [fakeNew 模拟实现new]
 * @param  {[Object]} object [要new操作实例的对象]
 * @return {[type]}          [返回实例的对象]
 */
function fakeNew(object) {
	// == let obj = {};
	// == obj.__proto__ = object.prototype;
	// == object.call(obj)
	let obj = Object.create(object.prototype);
	let k = object.call(obj);
	if (typeof k === 'object') {
		return k;
	} else {
		return obj;
	}
}




let M = function(name) {
	this.name = name;
}
let obj = fakeNew(M);
obj instanceof M;




// == 三、instanceof的原理
// 1、a instanceof A
//      等价于
//      a.__proto__ === A.prototype
// 2、以此类推（原型对象往上找）
//      a.__proto__.__proto__ === A.prototype.__proto__
//      所以 a instanceof Object
// 3、判断实例是哪个构造函数实例的：a.construtor
