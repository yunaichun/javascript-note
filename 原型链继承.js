//javascript主要通过原型链实现继承。
//原型链的构建主要是通过将一个类型的实例赋值给另一个构造函数的原型。构成实例和原型的链条。
//继承模式主要有原型式继承、寄生式继承、寄生组合式继承


//组合继承

//被继承（祖先）构造函数（可以new出来的）
function SuperType(name){
	this.name=name;
	this.colors=["red","blue","green"];
}

//（祖先）构造函数的原型
SuperType.prototype.sayName=function(){
	console.log(this.name);
}

//继承（子孙）构造函数，所具有的属性（一个来自继承，一个来自本身）
function SubType(name,age){
	SuperType.call(this,name);//通过使用call()和apply()方法在新创建的实例环境下调用SuperType构造函数的方法
	this.age=age;
}

//继承方法（将实例赋值给另一个对象的原型链，完成继承另一个对象的属性和方法）
SubType.prototype=new SuperType();

//继承（子孙）自己本身自带的方法
SubType.prototype.sayAge=function(){
	console.log(this.age);
}



var instance1=new SubType("aa",100);
instance1.colors.push("black");
console.log(instance1.colors);
instance1.sayName();
instance1.sayAge();

var instance2=new SubType("bb",99);
console.log(instance2.colors);
instance2.sayName();
instance2.sayAge();








//对象是Object: 法1、var person=new Object();person.say=function(){}; 法2、var person={
//                   name : "ncyu",age:"25",say:function(){}
//              }
//列表：第一步：function list(){
//  this.name="";
//  this.age="";//拥有自己的属性
//  this.say=say;//在外面写自己的方法:function say(){}
//}
//第二步：var newlist=new list();

