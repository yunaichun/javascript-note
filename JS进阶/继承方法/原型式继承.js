/*原型式继承：本质是执行对给定对象的浅复制，复制得到的副本还可以进一步改造
特点：1、没有严格原型意义使用构造函数
      2、借助原型可以基于已有的对象创建新对象
      3、不必创建自定义类型
*/
function object(o){
	//临时构造函数
	function F(){}
	//传入的对象作为临时构造函数的原型
	F.prototype=o;
	//返回临时构造函数的新实例
	return new F();
}
var person={
	name:"zhangsan",
	friends:["test"]
};
//返回的是一个实例
var anotherPerson=object(person);
console.log(anotherPerson.name);//"zhangsan"
console.log(anotherPerson.friends);//["test"]
anotherPerson.name="lisi";
anotherPerson.friends.push("dada");

var yetAnothrePerson=object(person);
console.log(yetAnothrePerson.name);//"zhangsan"
console.log(person.friends);//["test,dada"]
yetAnothrePerson.name="wangwu";
yetAnothrePerson.friends.push("xiaoxiao");
console.log(person.friends);//["test","dada","xiaoxiao"]



/*原型式继承：Object.create()【ES5规范化，接收两个参数】
特点：1、第一个参数是用作新对象原型的对象。Object.create()与Object()相同
      2、第二个参数是新对象定义额外属性的对象。与Object.defineProperties()方法的第二个参数格式相同。
         这种方式制定的任何属性都会覆盖原型对象上的同名属性。
*/
//传入一个参数
var person={
	name:"zhangsan",
	friends:["test"]
};
var anotherPerson=Object.create(person);
console.log(anotherPerson.name);//"zhangsan"
console.log(anotherPerson.friends);//["test"]
anotherPerson.name="lisi";
anotherPerson.friends.push("dada");

var yetAnothrePerson=Object.create(person);
console.log(yetAnothrePerson.name);//"zhangsan"
console.log(person.friends);//["test,dada"]
yetAnothrePerson.name="wangwu";
yetAnothrePerson.friends.push("xiaoxiao");
console.log(person.friends);//["test","dada","xiaoxiao"]



//传入两个参数
var person={
	name:"zhangsan",
	friends:["test"]
};
var anotherPerson=Object.create(person,{
	name:{
		value:"lisi"
	}
});
console.log(anotherPerson.name);//lisi