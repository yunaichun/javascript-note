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
//return的是function
var name = "window作用域";   
var object = {   
　　name : "对象作用域",   
　　getNameFunc : function(){   
　　　　return function(){ 
            console.log(this);//window
            console.log(this===window);//true(非浏览器指向global)
　　　　　　return this.name;   
　　　  };   
　　}   
};   
console.log(typeof object.getNameFunc()); //function
console.log(object.getNameFunc() instanceof Object); //true
console.log(object.getNameFunc()()); //"window作用域"



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
        普通函数return：objece，其中object中有function，则值会一直保存在这个对象中
*/
/* 

构造函数中有return时this的指向：
1、return的是五种简单数据类型：String，Number，Boolean，Null，Undefined。
这种情况下，忽视return值，依然返回this对象。
2、return的是Object：这种情况下，不再返回this对象，而是返回return语句的返回值。

普通函数中有return时this的指向：
1、return的是基本类型或者表达式：就是这个值
2、return的是function：就是闭包，变成全局，this的作用域已经是window
3、return的是Object：Object中如有function，也是闭包，
this的作用域是返回的这个Object，只不过变量的值一直保存在Object中，而不是window中。

综上可知：闭包不是在构造函数中返回，而是在普通函数和对象字面量中返回function或者带function的Object
*/
//return的是Object
function create_counter(initial){
    var x=initial||0;
    console.log("闭包之外x变量的值"+x);//只有在初引用的时候才在
    return {
        //此函数可以访问create_counter内部变量inintial（形参），将这个函数返回的话，creater_counter外部就可以访问create_counter内部的变量inintial了。
        //由于initial变为全局变量了，所以保存状态，所以每次传递值(实参)进去都会保存下来。
        inc:function(){
        	console.log("x变量的值一直保存在这个对象中"+x);//这个值一直保存在这个对象作用域中不被销毁
        	console.log(this);//Object{}
            console.log(this instanceof Object);//true
            x+=1;
            return x;
        }
    };
}
var c1=create_counter();
console.log(typeof c1);//object
console.log(c1 instanceof Object);//true

console.log(c1.inc());//1
console.log(c1.inc());//2
console.log(c1.inc());//3
console.log(x);//由于x变量的值是在return的全局Object中，但不是在window直接作用域中，所以访问不到

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