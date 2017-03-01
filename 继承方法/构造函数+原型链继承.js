/*构造函数+原型链继承：
------子构造函数方法可以不用在构造函数中定义了，写在原型上可以实现函数复用
------父构造函数对应的原型对象定义的方法，对子实例可见了
*/

function SuperType(name){
	this.name=name;
	//引用类型属性不写在原型之上
	this.colors=["red","blue","green"];
}
//只在原型上定义方法
SuperType.prototype.sayName=function(){
	console.log(this.name);
};
function SubType(name,age){
	//继承实例属性
	SuperType.call(this,name);
	this.age=age;
}
//继承原型上的方法
SubType.prototype=new SuperType();
//自己特有方法
SubType.prototype.sayAge=function(){
	console.log(this.age);
};
var instance=new SubType("zhangsan",29);
instance.colors.push("black");
console.log(instance.colors);//"red,blue,green,black"
instance.sayName();//"zhangsan"
instance.sayAge();//29

var instance1=new SubType("lisi",27);
console.log(instance1.colors);//"red,blue,green"
instance.sayName();//"lisi"
instance.sayAge();//27