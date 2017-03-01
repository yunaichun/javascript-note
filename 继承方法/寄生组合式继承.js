/*寄生组合式继承：
------通过借用构造函数来继承属性
------通过原型链的混合形式来继承方法
*/
//组合继承：实例放在原型链继承之后
//实例属性：age、name、colors。原型对象方法：SubType.prototype.sayAge。实例对象原型方法：SuperType.prototype.sayName
function SuperType(name){
	this.name=name;
	this.colors=["red","blue","green"];
}
SuperType.prototype.sayName=function(){
	console.log(this.name);
};
function SubType(name,age){
	SuperType.call(this,name);//第二次调用SuperType
	this.age=age;
}
SubType.prototype=new SuperType();//第一次调用SuperType
SubType.prototype.sayAge=function(){
	console.log(this.age);
};

console.log(SubType.prototype.constructor);//SuperType
SubType.prototype.constructor=SubType;//其实不管指向哪里，都可以完成调用

var instance = new SubType("zhangsan",29);
console.log(instance instanceof SubType);//true
console.log(SubType.prototype.isPrototypeOf(instance));//true
console.log(instance.sayAge());//29
console.log(instance.sayName());//"zhangsan"



//寄生组合式继承：
/*特点：
      1、inheritPrototype只负责继承原型对象的方法
      2、SuperType.call(this,name)只负责继承实例对象属性和方法
*/
/*优点：
      1、只调用了一次SuperType构造函数
      2、避免了在SubType.prototype上面创建不必要的、多余的属性
      3、原型链还能保持不变，正常使用instanceof和isPrototypeOf();
*/
//将SuperType原型的方法添加到SubType.prototype
function inheritPrototype(SubType,SuperType){
	var prototype=object(SuperType.prototype);//创建对象
	prototype.constructor=SubType;//增强对象
	SubType.prototype=prototype;//指定对象
}
function object(o){
	function F(){}
	F.prototype=o;
	return new F();
}
function SuperType(name){
	this.name=name;
	this.colors=["red","blue","green"];
}
SuperType.prototype.sayName=function(){
	console.log(this.name);
};
function SubType(name,age){
	SuperType.call(this,name);//只有一次调用SuperType
	this.age=age;
}
//SubType.prototype继承SuperType.prototype原型方法，而且没改变原型对象指向的构造函数
inheritPrototype(SubType,SuperType);
//添加原型对象方法
SubType.prototype.sayAge=function(){
	console.log(this.age);
};
//调用一次SuperType，继承SuperType实例属性
var instance = new SubType("zhangsan",29);
console.log(instance instanceof SubType);//true
console.log(SubType.prototype.isPrototypeOf(instance));//true
console.log(instance.sayAge());//29
console.log(instance.sayName());//"zhangsan"
