/**
 * [法一、通过Object.create实现继承一个对象]
 */
var vehicle = {
    getModel: function () {
        console.log('车辆的模具是：' + this.model);
    }
};
// 这里，可以在Object.create的第二个参数里使用对象字面量传入要初始化的额外属性，
// 其语法与Object.defineProperties或Object.defineProperty方法类型。
// 它允许您设定属性的特性，例如enumerable, writable 或 configurable。
var car = Object.create(vehicle, {
    'id': {
        value: MY_GLOBAL.nextId(),
        enumerable: true // 默认writable:false, configurable:false
 },
    'model': {
        value: '福特',
        enumerable: true
    }
});





/**
 * a.__proto__ = A.prototype
 * A.prototype.constructor = A   [a.constructor = A]
 * 
 */
var vehiclePrototype = {
    init: function (carModel) {
        this.model = carModel;
    },
    getModel: function () {
        console.log('车辆模具是：' + this.model);
    }
};
function vehicle(model) {
    function F() { };
    F.prototype = vehiclePrototype;
    var f = new F();//创建对象
    f.init(model);//拷贝属性属性
    return f;
}
var car = vehicle('福特Escort');
car.getModel();





/**
 * 寄生组合继承
 */
function inherit(child, parent) {
	//第一步：创建对象
	function F(){}
	F.prototype = parent.prototype;
	child.prototype = new F();
	//第二步：增强对象
	child.prototype.constructor = child;
	//第三步：指定对象
	child.superproto = parent.prototype;
}
function inherit(child, parent) {
	//第一步：创建对象
	function F(){}
	F.prototype = parent.prototype;
	var prototype = new F();
	//第二步：增强对象
	prototype.constructor = child;
	//第三步：指定对象
	child.prototype = prototype;
}





/**
 * 寄生组合继承二
 */
function inherit(child, parent) {
	//第一步：创建对象
	var prototype = object(parent.prototype);
	//第二步：增强对象
	prototype.constructor = child;
	//第三步：指定对象
	child.prototype = prototype;
}
function object(o) {
	function F() {};
	F.prototype = o; // F.prototype = parent.prototype;
	return new F();
}