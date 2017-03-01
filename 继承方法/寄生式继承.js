/*寄生式继承：本质是执行对给定对象的浅复制，复制得到的副本还可以进一步改造
特点：1、与寄生构造函数和工厂模式类似，即仅用于封装继承过程的函数
      2、函数内部以某种方式增强对象，最后再像真的是它做了所有工作一样返回对象
      3、主要考虑对象不是自定义类型和构造函数的情况。
*/
function object(o){
	function F(){}
	F.prototype=o;
	return new F();
}
function createAnother(original){
	var clone=object(original);
	clone.sayHi=function(){
		console.log("hi");
	};
	return clone;//返回这个对象
}
var person={
	name:"zhangsan",
	friends:["test"]
};
var anotherPerson=createAnother(person);
console.log(anotherPerson.sayHi());//"hi"

/*缺点：使用寄生式继承为对象添加函数，会由于不能做到函数复用而效率降低；
        这一点与构造函数类似。
*/