/*作用一：
         函数外部可以访问函数内部变量
*/
function f1(){
　　var n=999;
　　function f2(){
　　　　console.log(n);
　　}
//f2可以读取f1中的局部变量，那么只要把f2作为返回值，我们不就可以在f1外部读取它的内部变量了吗！
　　return f2;
}
var result=f1();
result(); // 999



/*作用二：
         变量值始终保存在内存中，不会被垃圾回收
*/
function f3(){
	var n=999;
	// 先在nAdd前面没有使用var关键字，因此 nAdd是一个全局变量，而不是局部变量。其次，nAdd的值是一个匿名函数（anonymous function）
	// 而这个匿名函数本身也是一个闭包，所以nAdd相当于是一个setter，可以在函数外部对函数内部的局部变量进行操作。
	nAdd=function(){
	  	n+=1;
	  	console.log(n);
	};
	function f4(){
		n++;
	    console.log(n);
	}
	return f4;
}
var result=f3();
result(); // 1000
nAdd();   //1001
//函数f3中的局部变量n一直保存在内存中，并没有在f3调用后被自动清除。
//原因就在于f3是f4的父函数，而f4被返回给全局，这导致f4始终在内存中，
//而f4的存在依赖于f3，因此f3也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。
result(); // 1002






/*注意一：
         return function(){}其实是返回给全局了，this的作用域已经是window了
*/
var name = "The Window";   
var object = {   
　　name : "My Object",   
　　getNameFunc : function(){   
　　　　return function(){   
　　　　　　return this.name;   
　　　  };   
　　}   
};   
console.log(object.getNameFunc(); //function(){   return this.name;   }
console.log(object.getNameFunc()());  //The Window【this.name的this指代作用域在全局】



/*注意二：
        匿名函数保持对外部变量i的引用
*/
function count(){
	var arr=[];
	for(var i=1;i<=3;i++){
		//访问函数外部的变量
		arr.push(function(){
			//匿名函数保持对外部变量i的引用
			return i*i;
		});
	}
	return arr;
}
var results=count();
console.log(results);
var f1=results[0];
var f2=results[1];
var f3=results[2];
/* 
全是16.是因为返回的匿名函数引用了外部变量i；
等到三个函数都返回时，他们所引用的变量i已经变成了4
*/
console.log(f1());//16
console.log(f2());//16
console.log(f3());//16
/* 
必须引用外部循环变量的话，方法是再创建一个函数，
用  该函数的参数  绑定  循环变量当前的值
无论该循环变量后序如何更改，已绑定到函数参数的值不变(实际参数不改变)
*/
function count2(){
	var arr2=[];
	for(var i=1;i<=3;i++){
		arr2.push((function(n){
             return function(){
				 return n*n;
			 };
		})(i));//创建一个匿名函数并且立刻执行。
	}
	return arr2;
}
var results2=count2();
//此时的arr是Function，不返回function函数结果也是一样的 ，只是不需要执行了
var f11=results2[0];
var f22=results2[1];
var f33=results2[2];
console.log(f11());//1
console.log(f22());//4
console.log(f33());//9



/*注意三：
        普通函数return一个对象，利用工厂模式(不用new)创建对象，可以被window调用
*/
/* 
当构造函数里调用return时：
A.return的是五种简单数据类型：String，Number，Boolean，Null，Undefined。
这种情况下，忽视return值，依然返回this对象。
B.return的是Object
这种情况下，不再返回this对象，而是返回return语句的返回值。
普通函数调用return：
A.是基本类型返回的就是基本类型
B.是对象就返回这个对象。这个对象可以用window调用，也可以不写window
*/
function create_counter(initial){
	var x=initial||0;
	return {
		inc:function(){
			x+=1;
            return x;
		}
	};
}

var c1=create_counter();
// 为什么普通函数可以直接调用普通函数return对象的方法？
// 原因是return这个对象导致全局可以访问到c1.inc()相当于window.c1.inc()
console.log(c1.inc());//1
console.log(c1.inc());//2
console.log(c1.inc());//3
var c2=create_counter(10);
console.log(c2.inc());//11
console.log(c2.inc());//12
console.log(c2.inc());//13



/*注意四：
        闭包还可以把多参数的函数编程单参数的函数（柯里化函数）
*/
function make_pow(n){
	//return的是一个函数，所以可以接着传递参数
	return function(x){
		return Math.pow(x,n);
	};
}
var pow2=make_pow(2);
var pow3=make_pow(3);
console.log(pow2(5));//25
console.log(pow3(7));//2187