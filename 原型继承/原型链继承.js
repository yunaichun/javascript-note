/* 原型链:
一、实例对象a指向原型对象A.p(__proto__)，原型对象A.p指向构造函数A(constructor)
二、实例对象b指向原型对象B.p(__proto__)，原型对象B.p指向构造函数B(constructor)

如果A.p=b：
A.即原型对象A.p指向实例对象B，由二可知原型对象A.p指向原型对象B.p
B.由A知原型对象A.p指向原型对象B.p，而由一知原型对象A.p指向构造函数A
  所以原型对象B.p包含一个指向构造函数A的指针

这样就会构成原型与实例的链条:
A.p-->B.p(A.p=b)-->A-->new A()[实例继承了B.p][起始地方]-->A.p
*/
function SuperType(){
	this.property="被继承者";
}
SuperType.prototype.getSuperValue=function(){
	return this.property;
};

function SubType(){
	this.subproperty="继承者";
};
//SubType.prototype指向SuperType.prototype，
//---getSuperValue()方法任在SuperType.prototype原型对象中
//---property属性则在SubType.prototype原型对象中，因为property是一个实例属性。
SubType.prototype=new SuperType();

SubType.prototype.getSubValue=function(){
	return this.subproperty;
};
//instance指向SubType.prototype
var instance =new SubType();
//搜索三阶段：搜索实例-->搜索SubType.prototype-->搜索SuperType.prototype
console.log(instance.getSuperValue());//"被继承者"




/*注意一：别忘记默认的原型对象
---所有函数对象的默认原型对象都是Object的实例，
---因此默认原型对象都会包含一个内部指针，指向Object.prototype

一句话，SubType继承了SuperType，而SuperType继承了Object。
当调用instance.toString()，实际上是调用保存在Object.prototype中的方法
*/
console.log(instance);
/* 
原型链：A.p-->B.p(A.p=b)-->A-->new A()[实例继承了B.p][起始地方]-->A.p
搜索三阶段：
SubType[                             //实例对象
            subproperty:"继承者",    //实例对象自身属性
            __proto__:SuperType{     //实例对象的自身原型对象
            	getSubValue:(),      //实例对象的自身原型对象getSubValue()方法
            	property:"被继承者", //实例对象的自身原型对象的property属性（继承获取）
            	__proto__:object{           //实例对象继承的原型对象
            		constructor:SuperType(),//实例对象继承的原型对象指向的构造函数
            		getSuperValue:(),       //实例对象继承的原型对象方法
            		__proto__:Object{……}
            	}
            }
          ]
*/
console.log(instance.toString());//[object object]




/*注意二：原型和实例的关系
---instanceof
---isPrototypeOf：只要是原型链中出现过的原型，都可以说是该原型链派生的实例的原型
*/
console.log(instance instanceof Object);//true
console.log(instance instanceof SuperType);//true
console.log(instance instanceof SubType);//true

console.log(Object.prototype.isPrototypeOf(instance));//true
console.log(SuperType.prototype.isPrototypeOf(instance));//true
console.log(SubType.prototype.isPrototypeOf(instance));//true




/*注意三：添加新方法注意位置
------给原型添加方法的代码一定要放在替换原型的语句之后，不会改变原型对象
------如果原型添加方法的代码放在替换原型的语句之前，将会改变原型对象
------给原型添加方法的代码以对象字面量的形式放在替换原型的语句之前或者之后，都将改变原型对象
*/
/*例一：原型添加方法的代码放在替换原型的语句之后*/
function SuperType(){
	this.property="被继承者";
}
SuperType.prototype.getSuperValue=function(){
	return this.property;
};
function SubType(){
	this.subproperty="继承者";
};
SubType.prototype=new SuperType();

console.log(SubType.prototype.constructor);//SuperType
//原型添加方法的代码放在替换原型的语句之后，会替换实例对象指向的原型方法
SubType.prototype.getSubValue=function(){
	return this.subproperty;
};
SubType.prototype.getSuperValue=function(){
	return false;
};
console.log(SubType.prototype.constructor);//SuperType，原型对象未改变
var instance =new SubType();
console.log(instance);
console.log(instance.getSuperValue());//false


/*例二：原型添加方法的代码放在替换原型的语句之前*/
function SuperType(){
	this.property="被继承者";
}
SuperType.prototype.getSuperValue=function(){
	return this.property;
};
function SubType(){
	this.subproperty="继承者";
};
//原型添加方法的代码放在替换原型的语句之前，不会将初始原型的方法添加在新原型对象之上
SubType.prototype.getSubValue=function(){
	return this.subproperty;
};
SubType.prototype.getSuperValue=function(){
	return false;
};
console.log(SubType.prototype.constructor);//SubType
/*重新定义了原型对象，初始原型对象的方法将不再具有了*/
SubType.prototype=new SuperType();
console.log(SubType.prototype.constructor);//SuperType，原型对象已经改变了
var instance =new SubType();
console.log(instance);
console.log(instance.getSuperValue());//"被继承者"


/*例三：给原型添加方法的代码以对象字面量的形式放在替换原型的语句之前*/
function SuperType(){
	this.property="被继承者";
}
SuperType.prototype.getSuperValue=function(){
	return this.property;
};
function SubType(){
	this.subproperty="继承者";
};
//给原型添加方法的代码以对象字面量的形式放在替换原型的语句之前
//此时的原型对象已经改变了，之前继承的SuperType原型对象的方法将不再拥有
SubType.prototype={
	getSubValue:function(){
		return this.subproperty;
	},
	someOtherMethod:function(){
		return false;
	}
};
console.log(SubType.prototype.constructor);//Object()
SubType.prototype=new SuperType();
console.log(SubType.prototype.constructor);//SuperType，原型对象已经改变了
var instance =new SubType();
console.log(instance);
console.log(instance.getSubValue());//error


/*例四：给原型添加方法的代码以对象字面量的形式放在替换原型的语句之后*/
function SuperType(){
	this.property="被继承者";
}
SuperType.prototype.getSuperValue=function(){
	return this.property;
};
function SubType(){
	this.subproperty="继承者";
};
SubType.prototype=new SuperType();
console.log(SubType.prototype.constructor);//SuperType

//给原型添加方法的代码以对象字面量的形式放在替换原型的语句之后
//此时的原型对象已经改变了，之前继承的SuperType原型对象的方法将不再拥有
SubType.prototype={
	getSubValue:function(){
		return this.subproperty;
	},
	someOtherMethod:function(){
		return false;
	}
};
console.log(SubType.prototype.constructor);//Object()，原型对象已经改变了
var instance =new SubType();
console.log(instance);
console.log(instance.getSuperValue());//error



/*注意四：原型链的问题
------继承另一个对象属性是引用类型的话，所有实例都会共享这个引用类型属性，对引用类型属性的修改将会传递给其他实例
------原型链继承不可给父实例对象传递参数
*/
function SuperType(){
	//属性包含引用类型值
	this.colors=["red","blue","green"];
}
function SubType(){
};
SubType.prototype=new SuperType();
var instance =new SubType();
instance.colors.push("black");
console.log(instance.colors);//"red,blue,green,black"

var instance2 =new SubType();
console.log(instance2.colors);//"red,blue,green,black"