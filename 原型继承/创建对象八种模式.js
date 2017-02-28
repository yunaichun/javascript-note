/*一、原始方法
缺点：使用同一个接口创建很多对象，会产生大量的重复代码。
*/
var person=new Object();
person.name="zhangsan";
person.age=29;
person.job="Software";
person.sayName=function(){
	console.log(this.name);
};



/*二、工厂模式
缺点：没有解决对象识别的问题（即怎样知道一个对象的类型）
*/
function createPerson(name,age,job){
	var o=new Object();
	o.name=name;
	o.age=age;
	o.job=job;
	o.sayName=function(){
		console.log(this.name);
	};
	return o;
}
var person1=createPerson("zhangsan",29,"Software");
var person1=createPerson("lisi",27,"Doctor");



/*三、构造函数模式*/
/*-----3.1-----
缺点：例1的缺点是person1和person2都有一个sayName()方法，这两个方法不是同一个Function的实例。
      js中的函数即是对象，因此每定义一个函数，也就是实例化一个对象。
      所以例1等价于例2。
      所以每个Person实例都包含一个不同的Function实例（以显示name属性）的本质。
      //不同实例上的同名函数是不相同的。不同的Function实例都是不同的Object实例
      //console.log(new Function() instanceof Object);//true
      也就是一这种方式创建函数，会导致不同的作用域链和标识符解析。
      因此，不同实例上的同名函数是不相同的。

*/
function Person(name,age,job){
	this.name=name;
	this.age=age;
	this.job=job;
	this.sayName=function(){
		console.log(this.name);
	};
}
var person1=new Person("zhangsan",29,"Software");
var person2=new Person("lisi",27,"Doctor");
//构造函数的实例的constructor属性指向构造函数Person
console.log(person1.constructor==Person);//true
console.log(person2.constructor==Person);//true
//检测对象类型，person1是构造函数Person的实例，所有对象均继承自Object
console.log(person1 instanceof Object);//true
console.log(person1 instanceof Person);//true
console.log(person2 instanceof Object);//true
console.log(person2 instanceof Person);//true
console.log(person1.sayName==person2.sayName);//false

/*-----3.2-----
缺点：每个Person实例都包含一个不同的Function实例（以显示name属性）的本质。
      也就是一这种方式创建函数，会导致不同的作用域链和标识符解析。
      因此，不同实例上的同名函数是不相同的。
*/
function Person(name,age,job){
	this.name=name;
	this.age=age;
	this.job=job;
	//与申明函数在逻辑上是等价例1的
	this.sayName=new Function("console.log(this.name)");
}
var person1=new Person("zhangsan",29,"Software");
var person2=new Person("lisi",27,"Doctor");
//不同实例上的同名函数是不相同的。不同的Function实例都是不同的Object实例
//console.log(new Function() instanceof Object);//true
console.log(person1.sayName==person2.sayName);//false

/*-----3.3-----
缺点：对象方法多就需要定义多个全局函数
      全局作用域的函数只能被某一个对象调用，让全局作用域有点名不副实。
*/
function Person(name,age,job){
	this.name=name;
	this.age=age;
	this.job=job;
	//创建两个同样任务的Function实例没有必要,
	//有this对象在，根本不用再执行代码前就把函数绑定到特定对象上面
	this.sayName=sayName;
}
//全局函数
function sayName(){
	console.log(this.name);
};
var person1=new Person("zhangsan",29,"Software");
var person2=new Person("lisi",27,"Doctor");
//person1与person2共享全局作用域中定义的同一个函数(相当于window)
console.log(person1.sayName==person2.sayName);//true



/*四、原型模式
prototype原型属性：这个属性是一个指针，指向一个对象。
这个对象包含可以由特定类型的所有实例共享的属性和方法。
即prototype就是通过调用构造函数而创建的那个对象实例的原型对象。
使用原型对象的好处是可以让所有实例共享它所包含的属性和方法。
换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中。
*/
//不必在构造函数中定义对象实例的信息，也不会有全局函数了
function Person(){
}
Person.prototype.name="zhangsan";
Person.prototype.age=29;
Person.prototype.job="Software";
Person.prototype.sayName=function(){
	console.log(this.name)
};
var person1=new Person();
var person2=new Person();
//person1与person2共享Person.prototype作用域中定义的同一个函数
console.log(person1.sayName==person2.sayName);//true


/*-----4.1、原型对象-----

  Person.prototype指向原型对象

  Person.prototype.contrctor指向构造函数Person【存在于构造函数与原型对象之间】

  new Person()实例的__proto__指向原型对象，此属性不可见【存在于实例与原型对象之间】
*/

//实例与原型对象的关系：通过isPrototypeOf()方法来确定
console.log(Person.prototype.isPrototypeOf(person1));//true
console.log(Person.prototype.isPrototypeOf(person2));//true
//实例与原型对象的关系：通过Object.getPrototypeOf()方法获取实例对象的原型
console.log(Object.getPrototypeOf(person1)==Person.prototype);//true
console.log(Object.getPrototypeOf(person1).name);//"zhangsan"

//上面说明可以通过实例对象person1访问保存在原型中的值
//但是却不能通过实例对象重写原型中的值
var person1=new Person();
var person2=new Person();
person1.name="lisi";
console.log(person1.name);//"lisi"，来自实例
console.log(person2.name);//"zhangsan"，来自原型

//delete可以删除实例对象的属性，访问到的就是原型对象的属性
//但是却不能通过实例对象重写原型中的值
var person1=new Person();
person1.name="lisi";
console.log(person1.name);//"lisi"，来自实例
delete person1.name;
console.log(person1.name);//"zhangsan"，来自原型

//hasOwnProperty()：检测属性存在实例对象还是原型对象中
var person1=new Person();
console.log(person1.hasOwnProperty("name"));//false
person1.name="lisi";
console.log(person1.hasOwnProperty("name"));//true
delete person1.name;
console.log(person1.hasOwnProperty("name"));//false


/*-----4.2、原型对象与in操作-----
   单独in操作：属性先从实例对象上访问，再从原型对象访问
   for-in获取：获取原型对象和实例对象所有可枚举属性
*/
//hasOwnProperty()获取实例对象上的属性
var person1=new Person();
//得不到原型对象上面"name"属性
console.log(person1.hasOwnProperty("name"));//false
console.log("name" in person1);//true
person1.name="lisi";
//得到实例对象上面"name"属性
console.log(person1.hasOwnProperty("name"));//true
console.log("name" in person1);//true
//in获取属性来自实例对象+原型对象
console.log(!person1.hasOwnProperty("name")&&("name" in person1));


//for-in：获取所有可枚举属性，包括原型对象和实例对象的属性，屏蔽了原型中不可枚举属性
//下例屏蔽了原型对象中不可枚举的toString()方法，找到的是对象o定义的名为toString()方法
var o={
	toString:function(){
		return "My Object";
	}
};
for(var prop in o){
	if(prop=="toString"){
		console.log("Found toString");//IE中不会显示
	}
}
//Object.keys()：获取可枚举属性【实例对象调用返回实例对象属性，原型对象调用返回原型属性】
var keys=Object.keys(Person.prototype);
console.log(keys);//"name,age,job,sayName"
var p1=new Person();
p1.name="lisi";
p1.age=27;
var p1keys=Object.keys(p1);
console.log(p1keys);//"name,age"
//getOwnPropertyNames()：获取枚举和不可枚举属性
var keys=Object.getOwnPropertyNames(Person.prototype);
console.log("constructor,name,age,job,sayName");


/*-----4.3、更简单的原型写法-----
  (new Person()).constructor指向构造函数【即实例对象的constructor指向构造函数】
  Person.prototype.constructor指向构造函数【即原型对象的constructor指向构造函数】
  创建一个函数，就会创建它的prototype对象，这个对象也会自动获取constructor属性。
*/
//本质上完全重写默认的prototype对象，因此constructor属性也就变成了新对象的constructor属性
//新对象的constyctor属性指向Object构造函数，不再指向Person函数
function Person(){
}
Person.prototype={
	name:"zhangsan",
	age:29,
	job:"Software",
	sayName:function(){
		console.log(this.name);
	}
};
var friend=new Person();
//检测对象类型，person1是构造函数Person的实例，所有对象均继承自Object
console.log(friend instanceof Object);//true
console.log(friend instanceof Person);//true
//构造函数的实例的constructor属性指向构造函数Person
console.log(friend.constructor==Person);//false
console.log(friend.constructor==Object);//true

//保证一致性
function Person(){
}
Person.prototype={
	constructor:Person,
	name:"zhangsan",
	age:29,
	job:"Software",
	sayName:function(){
		console.log(this.name);
	}
};
var friend=new Person();
//检测对象类型，person1是构造函数Person的实例，所有对象均继承自Object
console.log(friend instanceof Object);//true
console.log(friend instanceof Person);//true
//构造函数的实例的constructor属性指向构造函数Person
console.log(friend.constructor==Person);//true
console.log(friend.constructor==Object);//false【现在只是Person的实例了】


/*-----4.4、原型的动态性-----
   实例对象与原型对象具有松散的连接关系
   重写整个原型对象就会报错
*/
//实例对象与原型对象具有松散的连接关系（原型在实例对象之后，实例也能访问到原型对象的属性）
function Person(){
}
var friend=new Person();
Person.prototype.sayHi=function(){
	console.log("hi");
};
//var friend=new Person();
friend.sayHi();//"hi"

//重写整个原型对象：
//调用构造函数生成实例对象，会为实例对象添加一个指向最初原型对象的指针。
//当改写原型对象为另一个对象就切断了最初原型对象与构造函数的联系。
//实例的__proto__-->原型对象<------>构造函数
function Person2(){
}
//此时实例对象的__proto__指向的是最初原型对象
var friend2=new Person2();
//但是现在将原型对象改写为一个新对象了。最初原型对象还是不变的，没有sayName方法。
Person2.prototype={
	constructor:Person,
	name:"zhangsan",
	age:29,
	job:"Software",
	sayName:function(){
		console.log(this.name);
	}
};
//friend2.sayName();//会报错


/*-----4.5、原生对象的原型-----
   数据类型：Undefined、Null、String、Number、Boolean、Object
   引用类型：可以用new操作符后跟一个构造函数创建（Object、Array、Date、RegExp、Function）。
   基本包装类型：String、Number、Boolean（也属于原生引用类型）
*/
//获取所有默认方法的引用，也可以定义新方法
console.log(Array.prototype);
console.log(typeof Array.prototype.sort);//"function"
console.log(typeof Array.prototype.substring);//"function"


/*-----4.6、原型对象的问题-----
   原型对象包含基本包装类型属性，可以被所有实例共享，实例添加同名属性，又可以隐藏原型对象属性
   原型对象包含引用类型属性，问题就很突出了，实例一般都是要有自己独立属性的。
*/

function Person3(){
}
Person3.prototype={
	constructor:Person,
	name:"zhangsan",
	age:29,
	job:"Software",
	friends:["wangwu"],
	sayName:function(){
		console.log(this.name);
	}
};
var person1=new Person3();
var person2=new Person3();
//由于friends数组存在于原型对象中，而不是person1中，所有刚刚的修改也会体现在其他实例中
person1.friends.push("dada");
console.log(person1.friends);//["wangwu","dada"]
console.log(person2.friends);//["wangwu","dada"]
console.log(person1.friends==person2.friends);//true
person1.go="go";
console.log(person1.go);//go
console.log(person2.go);//undenfined



/*五、构造函数模式+原型模式
      构造函数模式：可以传递参数，定义实例属性
      原型模式：定义方法和共享属性
*/
function Person10(name,age,job){
	this.name=name;
	this.age=age;
	this.job=job;
	this.friends=["wangwu"];
}
Person10.prototype={
	constructor:Person,
	sayName:function(){
		console.log(this.name);
	}
};
var person1=new Person10("zhangsan",29,"Software");
var person2=new Person10("lisi",27,"Doctor");
person1.friends.push("dada");
console.log(person1.friends);//["wangwu","dada"]
console.log(person2.friends);//["wangwu"]
//实例特有属性
console.log(person1.friends==person2.friends);//false
//共享方法
console.log(person1.sayName==person2.sayName);//true



/*六、动态原型模式
	特点：只在方法不存在的情况下，才会将它添加到原型中
	      代码只会在除此调用构造函数实例化的时候调用，此后，原型已经完成初始化
	缺点：不能使用对象字面量重写原型，
	      这样就会将原型对象赋值给另一个对象，就会切断现有实例与新原型之间的联系
*/
function Person11(name,age,job){
	this.name=name;
	this.age=age;
	this.job=job;
	console.log(typeof this.sayName);
	//只有在实例化的时候才会调用
	if(typeof this.sayName != "function"){
		console.log(11111);
		Person11.prototype.sayName=function(){
				console.log(this.name);
		};
	}
}
var person11=new Person11("zhangsan",29,"Software");
person11.sayName();//"zhangsan"



/*七、寄生构造函数模式
     特点：构造函数返回一个对象，和工厂模式一样。只不过用到new
     缺点：构造函数返回的对象与在构造函数外部创建的对象没有什么不同
           为此，不能依赖 instanceof操作符确定对象类型。
*/
function Person12(name,age,job){
	var o=new Object();
	o.name=name;
	o.age=age;
	o.job=job;
	o.sayName=function(){
		console.log(this.name);
	};
	return o;
}
var person12= new Person12("zhangsan",29,"Software");
person12.sayName();//"zhangsan"



/*八、稳妥的构造函数模式
     特点：和寄生构造函数模式一样，只不过不用new（和工厂模式一样的，区别在于函数首字母大写）
*/
function Person13(name,age,job){
	var o=new Object();
	o.name=name;
	o.age=age;
	o.job=job;
	o.sayName=function(){
		console.log(this.name);
	};
	return o;
}
//person13保存的是稳妥对象，除了调用sayName()方法之外，没有别的方法可以访问其数据成员
var person13= Person13("zhangsan",29,"Software");
person12.sayName();//"zhangsan"
