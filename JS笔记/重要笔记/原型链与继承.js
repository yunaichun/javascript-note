// 创建对象
// == 1、第一种方式：字面量
var o1 = {name: 'o1'};
var o2 = new Object({name: 'o2'});
// == 2、第二种方式：构造函数
var M = function (name) { this.name = name; };
var o3 = new M('o3');
// == 3、第三种方式：Object.create
var p = {name: 'p'};
var o4 = Object.create(p);


// == 继承
// == 借助构造函数实现继承
/**
* 原理：通过call或apply改变函数运行上下文，子类构造函数中执行父类构造函数
* 缺点：不能继承原型对象上的方法，只能继承构造函数中的属性和属性
*/
function Parent1 () {
    this.name = 'parent1';
}
Parent1.prototype.say = function () {
};
function Child1 () {
    Parent1.call(this);
    this.type = 'child1';
}

console.log(new Child1(), new Child1().say());


// == 借助原型链实现继承
/**
* 原理：prototype是子类构造函数的一个属性，是一个对象，赋值给父类的实例
* 缺点：父类构造函数上的的引用属性会在所有实例上共享；原因是所有实例引用的同一个对象
*/
function Parent2 () {
    this.name = 'parent2';
    this.play = [1, 2, 3];
}
function Child2 () {
    this.type = 'child2';
}
Child2.prototype = new Parent2();

var s1 = new Child2();
var s2 = new Child2();
s1.play.push(4);
console.log(s1.play, s2.play);


// == 组合继承
/**
* 优点：构造函数和原型继承的方法都具有了
* 缺点：在实例子类的时候，父类构造函数会执行两次。没必要将父类的构造函数放在子类的原型对象上去
*/
function Parent3 () {
    this.name = 'parent3';
    this.play = [1, 2, 3];
}
function Child3 () {
    // == 执行两次
    Parent3.call(this);
    this.type = 'child3';
}
// == 执行一次
Child3.prototype = new Parent3();

var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play);


// == 组合继承-优化1
/**
* 改进：不将父类的构造函数放在子类的原型对象上去
* 缺点：无法正确获取子类实例的构造函数；由于引用传递，将会导致父类实例也感染
*/
function Parent4 () {
    this.name = 'parent4';
    this.play = [1, 2, 3];
}
function Child4 () {
    Parent4.call(this);
    this.type = 'child4';
}
Child4.prototype = Parent4.prototype;

var s5 = new Child4();
var s6 = new Child4();
console.log(s5, s6);
// == true、true
console.log(s5 instanceof Child4, s5 instanceof Parent4);
// == Parent4
console.log(s5.constructor === Parent4);


// == 组合继承-优化2
/**
* 优点：完美解决方案
* 原理：通过Object.create创建的中间对象作为桥梁
*/
function Parent5 () {
    this.name = 'parent5';
    this.play = [1, 2, 3];
}
function Child5 () {
    Parent5.call(this);
    this.type = 'child5';
}
// == 改 Child5.prototype 的 constructor
// == 不会改 Parent5.prototype 的 constructor
Child5.prototype = Object.create(Parent5.prototype);
Child5.prototype.constructor = Child5;

var s7 = new Child5();
console.log(s7 instanceof Child5, s7 instanceof Parent5);
// == Child5
console.log(s7.constructor === Child5);
