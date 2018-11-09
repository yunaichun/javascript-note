/**
 * [fakeNew 模拟实现new]
 * @param  {[Object]} object [要new操作实例的对象]
 * @return {[type]}          [返回实例的对象]
 */
function fakeNew(object) {
	// let obj = {};
	// obj.__proto__ = object.prototype;
	let obj = Object.create(object.prototype);
	let k = object.call(obj);
	if (typeof k === 'object') {
		return k;
	} else {
		return obj;
	}
}


// 测试
let M = function(name) {
	this.name = name;
}
let obj = fakeNew(M);
// instance原理：obj.__prpto__ === M.prototype
obj instanceof M;
