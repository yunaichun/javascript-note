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
	//call指的是在（未来将要）新创建的SubType实例的环境中调用SuperType构造函数【相当于传递实例参数】
	SuperType.call(this,name);
	this.age=age;
}
//继承原型上的方法【也会继承name、colors属性】
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
instance1.sayName();//"lisi"
instance1.sayAge();//27