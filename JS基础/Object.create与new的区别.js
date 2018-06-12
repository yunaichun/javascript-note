/**
 * [Object.create(prototype, descriptors)]
 * @param  {Object} prototype   必填。创建的实例对象的原型
 * @param  {Object} descriptors 可选。包含一个或多个属性描述符的 JavaScript 对象。
 */
// a是b的原型对象。即b.__proto__ = a。问题是谁的原型是a？
var a = { x: 1 };
var b = Object.create(a);
console.log(b);//输出：{};
console.log(b.__proto__);//输出：{ x: 1 }


/**
 * [var a = new B()]
 * 第一步：var a = {};
 * 第二步：a.__proto__ = B.prototype;
 * 第三步：B.call(a);
 */
// a的原型对象是b的原型对象。即b.__proto__ = a.prototype;
var a = { x: 1 };
var b = new Object(a);
console.log(b);// 输出：{ x: 1 }
console.log(b.__proto__);// 输出：Object



// 数组转对象法一
var a = Object.assign({}, [1, 2, 3]);
// 数组转对象法二
var a =  {...[1, 2, 3]};