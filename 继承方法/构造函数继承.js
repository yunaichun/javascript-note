/*构造函数继承对比原型链继承：
------继承引用类型的属性，实例对引用类型属性的修改不会会传递给其他实例
------继承可给父构造函数传递参数
*/
//一、可以传递引用类型属性了
function SuperType(){
	this.colors=["red","blue","green"];
}
function SubType(){
	//call指的是在（未来将要）新创建的SubType实例的环境中调用SuperType构造函数
	SuperType.call(this);
}
var instance =new SubType();
instance.colors.push("black");
console.log(instance.colors);//"red,blue,green,black"
var instance2 =new SubType();
console.log(instance2.colors);//"red,blue,green"


//二、可以给父构造函数传递参数了
function SuperType(name){
	this.name=name;
}
function SubType(){
	//在SubType构造函数内部调用SuperType构造函数时，实际上是为SubType实例设置了name属性
	SuperType.call(this,"zhangsan");
	this.age=29;
}
var instance =new SubType();
console.log(instance.name);//"zhangsan"
console.log(instance.age);//29



/*构造函数问题：
------方法都是在构造函数中定义，无法实现函数复用
------父构造函数对应的原型对象定义的方法，对子实例是不可见的
*/



/*call、apply应用：
1、改变this指向，实现继承，如上所示
2、求数组最大值
*/
var arr=[1,2,3];
Math.max.apply(null,arr);//3



/*arguments：是对象函数的实际参数，arguments对象的长度是由实参个数决定的。
	实参长度：arguments.length
	某个实参：arguments[i]
*/
/*arguments.callee()：指向实参arguments对象的函数*/
function factorial(x){
    if(x<1){
   	    return 1;
    }else{ 
   	    return x*arguments.callee(x-1);
   	}
}
console.log(factorial(3));//6